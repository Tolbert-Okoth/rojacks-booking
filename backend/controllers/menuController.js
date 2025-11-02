const { Menu, Restaurant } = require('../models');

// @desc    Get all menu items
// @route   GET /api/menus
// @access  Public
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      order: [['category', 'ASC'], ['itemName', 'ASC']],
      include: {
        model: Restaurant,
        attributes: ['id', 'name']
      }
    });
    res.status(200).json(menus);
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Create a new menu item
// @route   POST /api/menus
// @access  Private/Admin
const createMenuItem = async (req, res) => {
  const { itemName, description, price, category, restaurantId } = req.body;
  
  // --- THIS IS THE FIX ---
  // Use the new BACKEND_URL variable to build a full, absolute URL
  const imageUrl = req.file 
    ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}` 
    : null;
  // --- END OF FIX ---

  if (!itemName || !price || !category || !restaurantId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const menuItem = await Menu.create({
      itemName,
      description,
      price,
      category,
      restaurantId,
      imageUrl, // <-- Save the full URL
    });
    res.status(201).json(menuItem);
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menus/:id
// @access  Private/Admin
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByPk(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const { itemName, description, price, category } = req.body;
    
    // --- THIS IS THE FIX ---
    let imageUrl = menuItem.imageUrl; // Keep old image
    if (req.file) {
      // Build a full, absolute URL
      imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
    }
    // --- END OF FIX ---

    const updatedMenuItem = await menuItem.update({
      itemName: itemName || menuItem.itemName,
      description: description || menuItem.description,
      price: price || menuItem.price,
      category: category || menuItem.category,
      imageUrl: imageUrl,
    });
    
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menus/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByPk(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    // TODO: Add logic here to delete the image file from storage

    await menuItem.destroy();
    res.status(200).json({ message: 'Menu item removed', id: req.params.id });
  } catch (error) {
    console.error(error); // Log the full error for yourself
    res.status(500).json({ 
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {} 
    });
  }
};

module.exports = {
  getMenus,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};