const { Sequelize } = require('sequelize');
require('dotenv').config();

// Ensure the DATABASE_URL is set in your .env file
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    // Add SSL support for production databases (like Neon, Render)
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
  },
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;