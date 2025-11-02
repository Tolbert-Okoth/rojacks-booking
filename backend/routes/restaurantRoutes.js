const express = require('express');
const router = express.Router();
const {
  getRestaurantDetails,
  updateRestaurantDetails,
} = require('../controllers/restaurantController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to get info
router.get('/', getRestaurantDetails);

// Private/Admin route to update info
router.put('/:id', protect, admin, updateRestaurantDetails);

module.exports = router;