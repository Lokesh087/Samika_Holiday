import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

// In-memory fallback users list for testing if MongoDB server is offline
let memoryUsers = [];

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password.' });
    }

    // Check if user requested admin role
    const isWantAdmin = role === 'admin';
    let assignedRole = 'user';

    if (isWantAdmin) {
      // Enforce ONLY 1 Admin in the system
      let adminCount = 0;
      try {
        adminCount = await User.countDocuments({ role: 'admin' });
      } catch (e) {
        adminCount = memoryUsers.filter(u => u.role === 'admin').length;
      }

      if (adminCount >= 1) {
        return res.status(400).json({ 
          success: false, 
          message: 'An Admin account already exists. Only 1 Admin is allowed in the system.' 
        });
      }
      assignedRole = 'admin';
    }

    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: assignedRole
      });

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        success: true,
        message: assignedRole === 'admin' ? 'Single Admin Account created successfully!' : 'Account created successfully!',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
      });
    } catch (dbErr) {
      // Memory fallback
      const existsInMem = memoryUsers.find(u => u.email === email.toLowerCase());
      if (existsInMem) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const memUser = {
        _id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        role: assignedRole
      };
      memoryUsers.push(memUser);

      const token = jwt.sign({ id: memUser._id, role: memUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        success: true,
        message: assignedRole === 'admin' ? 'Single Admin Account created successfully!' : 'Account created successfully!',
        token,
        user: { id: memUser._id, name: memUser.name, email: memUser.email, role: memUser.role }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    let foundUser = null;
    let isPasswordValid = false;

    try {
      foundUser = await User.findOne({ email: email.toLowerCase() });
      if (foundUser) {
        isPasswordValid = await bcrypt.compare(password, foundUser.password);
      }
    } catch (dbErr) {
      // Memory fallback check
    }

    if (!foundUser) {
      const memUser = memoryUsers.find(u => u.email === email.toLowerCase());
      if (memUser) {
        isPasswordValid = await bcrypt.compare(password, memUser.passwordHash);
        foundUser = {
          _id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          role: memUser.role
        };
      }
    }

    if (!foundUser || !isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials provided.' });
    }

    const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${foundUser.name}!`,
      token,
      user: { id: foundUser._id, name: foundUser.name, email: foundUser.email, role: foundUser.role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide email and new password.' });
    }

    if (newPassword.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ success: true, message: 'Password reset successfully! Please login with your new password.' });
      }
    } catch (dbErr) {}

    // Memory fallback
    const memUser = memoryUsers.find(u => u.email === email.toLowerCase());
    if (memUser) {
      memUser.passwordHash = hashedPassword;
      return res.status(200).json({ success: true, message: 'Password reset successfully! Please login with your new password.' });
    }

    return res.status(404).json({ success: false, message: 'No account found with this email address.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No auth token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    try {
      const user = await User.findById(decoded.id).select('-password');
      if (user) return res.status(200).json({ success: true, user });
    } catch (e) {}

    return res.status(200).json({
      success: true,
      user: { id: decoded.id, role: decoded.role, name: decoded.role === 'admin' ? 'System Admin' : 'User' }
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};
