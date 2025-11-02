const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // --- ADDED THIS BLOCK ---
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    // --- END OF BLOCK ---
    date: {
      type: DataTypes.DATEONLY, // Just the date, no time
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING, // e.g., "18:30"
      allowNull: false,
    },
    people: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending', // e.g., Pending, Confirmed, Cancelled
    },
    // restaurantId is added automatically by the association
  });

  return Booking;
};