import Package from '../models/Package.js';

// Fallback memory state if MongoDB is unavailable
let memoryPackages = [
  {
    _id: 'pkg_1',
    name: 'Explorer',
    price: '$499',
    desc: 'Perfect for backpackers looking for essential tours.',
    features: ['2 Destinations included', 'Shared group transfers', 'Local guide support', 'Standard hotel stays'],
    isPopular: false
  },
  {
    _id: 'pkg_2',
    name: 'Adventurer',
    price: '$899',
    desc: 'Highly recommended for custom family experiences.',
    features: ['5 Destinations included', 'Private premium transfers', 'Expert bilingual guide', '4-Star hotel bookings', 'Multi-city sightseeing passes'],
    isPopular: true
  },
  {
    _id: 'pkg_3',
    name: 'Luxury',
    price: '$1,499',
    desc: 'Indulge in premium VIP luxury treatment.',
    features: ['Unlimited destinations', 'Private luxury SUV transfers', 'Personal guide & translator', '5-Star luxury resort stays', 'VIP fast-track passes'],
    isPopular: false
  }
];

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, count: packages.length, packages });
  } catch (error) {
    return res.status(200).json({ success: true, count: memoryPackages.length, packages: memoryPackages });
  }
};

export const createPackage = async (req, res) => {
  try {
    const { name, price, desc, features, isPopular } = req.body;
    if (!name || !price || !desc) {
      return res.status(400).json({ success: false, message: 'Please provide Package Name, Price, and Description.' });
    }

    const featureList = Array.isArray(features) ? features : (typeof features === 'string' ? features.split('\n').filter(Boolean) : []);

    try {
      const newPackage = await Package.create({
        name,
        price,
        desc,
        features: featureList,
        isPopular: Boolean(isPopular)
      });
      return res.status(201).json({ success: true, message: 'Pricing Package created successfully!', package: newPackage });
    } catch (dbErr) {
      const memPkg = {
        _id: 'pkg_' + Date.now(),
        name,
        price,
        desc,
        features: featureList,
        isPopular: Boolean(isPopular)
      };
      memoryPackages.push(memPkg);
      return res.status(201).json({ success: true, message: 'Pricing Package created successfully!', package: memPkg });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const updated = await Package.findByIdAndUpdate(id, req.body, { new: true });
      if (updated) {
        return res.status(200).json({ success: true, message: 'Pricing Package updated successfully!', package: updated });
      }
    } catch (e) {}

    const index = memoryPackages.findIndex(p => p._id === id);
    if (index !== -1) {
      memoryPackages[index] = { ...memoryPackages[index], ...req.body };
      return res.status(200).json({ success: true, message: 'Pricing Package updated successfully!', package: memoryPackages[index] });
    }

    return res.status(404).json({ success: false, message: 'Package not found.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Package.findByIdAndDelete(id);
    } catch (e) {}

    memoryPackages = memoryPackages.filter(p => p._id !== id);
    return res.status(200).json({ success: true, message: 'Pricing Package deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
