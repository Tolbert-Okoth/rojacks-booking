const { Booking, Restaurant } = require('../models');
const { sendBookingConfirmation } = require('../config/mailService');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  const { customerName, phone, email, date, time, people, restaurantId } = req.body;

  try {
    // --- Validation for all fields ---
    if (!customerName || !phone || !email || !date || !time || !people || !restaurantId) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    
    // --- ADDED TIME VALIDATION BLOCK ---
    // The time string "HH:mm" can be compared directly
    if (time < "09:00" || time > "22:00") {
      return res.status(400).json({ 
        message: 'Bookings are only allowed between 9:00 AM and 10:00 PM' 
      });
    }
    // --- END OF NEW BLOCK ---

    // Check if restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }

    const booking = await Booking.create({
      customerName,
      phone,
      email,
      date,
      time,
      people,
      restaurantId,
    });

    // Send the email
    if (booking) {
      await sendBookingConfirmation(booking);
    }

    res.status(201).json(booking);
    
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      // Only send the detailed error in development mode
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['date', 'DESC'], ['time', 'DESC']], // Show newest first
      include: {
          model: Restaurant,
          attributes: ['name'] // Include restaurant name
      }
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      // Only send the detailed error in development mode
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Update a booking status (e.g., 'Confirmed')
// @route   PUT /api/bookings/:id
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByPk(req.params.id);

        if(!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json(booking);

    } catch (error) {
         console.error(error); // Log the full error for yourself
        res.status(500).json({ 
          message: 'Server Error',
          // Only send the detailed error in development mode
          error: process.env.NODE_ENV === 'development' ? error.message : {} 
        });
    }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Booking removed', id: req.params.id });
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      // Only send the detailed error in development mode
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
};