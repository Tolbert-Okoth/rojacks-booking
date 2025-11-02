require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { sequelize } = require('./models'); // Will auto-import index.js
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const menuRoutes = require('./routes/menuRoutes'); 
const { protect } = require('./middleware/authMiddleware');

const app = express();

// --- Middleware ---
app.disable('x-powered-by'); // <-- THIS IS THE NEW LINE
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/menus', menuRoutes); 

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Rojacks API is running!' });
});

// MAKE UPLOADS FOLDER STATIC
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- Server & DB Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true }); 

    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});