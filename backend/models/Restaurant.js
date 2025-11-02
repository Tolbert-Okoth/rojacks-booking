const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Restaurant = sequelize.define('Restaurant', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Rojacks Restaurant',
    },
    image: {
      type: DataTypes.STRING, // URL to the image (handle upload separately)
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Migori County, Sub Rongo',
    },
    cuisine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Restaurant;
};