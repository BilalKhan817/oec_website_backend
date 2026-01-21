const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const homeRoutes = require('./routes/home');
const aboutUsRoutes = require("./routes/about-us/index");
const usSubmenuRoutes = require("./routes/us-submenu/index");
const navbarRoutes = require("./routes/navbar/index");
const emigrantsRoutes = require("./routes/emigrants/index");
const developmentHubRoutes = require("./routes/development-hub/index");
const mediaCenterRoutes = require("./routes/media-center/index");
const reportsAnalyticsRoutes = require("./routes/reports-analytics/index");
const contactUsPageRoutes = require("./routes/contact-us");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// In your index.js, make sure you have:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oec_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', homeRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/us-submenu", usSubmenuRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/emigrants", emigrantsRoutes);
app.use("/api/development-hub", developmentHubRoutes);
app.use("/api/media-center", mediaCenterRoutes);
app.use("/api/reports-analytics", reportsAnalyticsRoutes);
app.use("/api/contact-us", contactUsPageRoutes);
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});