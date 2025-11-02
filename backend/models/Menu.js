const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Menu = sequelize.define('Menu', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // e.g., 1250.00
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING, // e.g., 'Appetizer', 'Main Course', 'Dessert'
      allowNull: false,
      defaultValue: 'Main Course',
    },
    imageUrl: {
      type: DataTypes.STRING, // We'll add image uploads later
      allowNull: true,
    },
    // restaurantId is added automatically by the association
  });

  return Menu;
};