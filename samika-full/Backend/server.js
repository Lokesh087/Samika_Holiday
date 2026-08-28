import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './src/config/config.js'; // Imports & validates env variables
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import tourRoutes from './src/routes/tourRoutes.js';
import packageRoutes from './src/routes/packageRoutes.js';
import hotelRoutes from './src/routes/hotelRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import agencyRoutes from './src/routes/agencyRoutes.js';

const app = express();
const PORT = config.port;

// Connect to MongoDB Database & Seed initial data
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for frontend Vite app
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Travelleragencie Express Server is running smoothly!' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/agencies', agencyRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack);
  res.status(500).json({ success: false, message: 'Server internal error occurred.' });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Travelleragencie Express Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`=================================================`);
});

export default app;
