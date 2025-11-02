const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route for customers
router.post('/', createBooking);

// Private/Admin routes
router.get('/', protect, admin, getAllBookings);
router.put('/:id', protect, admin, updateBookingStatus);
router.delete('/:id', protect, admin, deleteBooking);

module.exports = router;