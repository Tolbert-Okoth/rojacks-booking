const { Restaurant } = require('../models');

// @desc    Get restaurant details (and create if it doesn't exist)
// @route   GET /api/restaurants
// @access  Public
const getRestaurantDetails = async (req, res) => {
  try {
    // Find the first (or only) restaurant
    const restaurant = await Restaurant.findOne();

    // --- THIS IS THE CRITICAL FIX ---
    // If no restaurant is found, create the default one.
    if (!restaurant) {
      const defaultRestaurant = await Restaurant.create({
         name: "Rojacks Restaurant",
         location: "Migori County, Sub Rongo",
         description: "Welcome to Rojacks!",
         contact: "0712345678"
      });
      // Return the NEWLY created restaurant
      return res.status(200).json(defaultRestaurant);
    }
    // --- END OF FIX ---

    // Otherwise, return the one we found
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      // Only send the detailed error in development mode
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Update restaurant details
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const updatedRestaurant = await restaurant.update(req.body);
    res.status(200).json(updatedRestaurant);
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
  getRestaurantDetails,
  updateRestaurantDetails,
};