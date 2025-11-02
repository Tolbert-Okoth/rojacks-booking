const sequelize = require('../config/db'); // Import the singleton instance

// Import models
const User = require('./User')(sequelize);
const Restaurant = require('./Restaurant')(sequelize);
const Booking = require('./Booking')(sequelize);
const Menu = require('./Menu')(sequelize); // <-- 1. IMPORT NEW MODEL

// --- Define Relationships ---

// A Restaurant can have many Bookings
Restaurant.hasMany(Booking, {
  foreignKey: {
    name: 'restaurantId',
    allowNull: false,
  },
  onDelete: 'CASCADE', 
});
Booking.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
});

// --- 2. ADD NEW RELATIONSHIP ---
// A Restaurant can have many Menu items
Restaurant.hasMany(Menu, {
  foreignKey: {
    name: 'restaurantId',
    allowNull: false,
  },
  onDelete: 'CASCADE', // If restaurant is deleted, delete its menu
});
Menu.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
});
// --- END OF NEW BLOCK ---


// --- Exports ---
// Export the connection and all models
module.exports = {
  sequelize,
  User,
  Restaurant,
  Booking,
  Menu, // <-- 3. EXPORT NEW MODEL
};