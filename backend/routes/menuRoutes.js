const express = require('express');
const router = express.Router();
const {
  getMenus,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // <-- 1. IMPORT UPLOAD

// Public route to get all menu items
router.get('/', getMenus);

// Admin-only routes to manage the menu
// 2. APPLY MIDDLEWARE
// 'image' is the name of the form field
router.post('/', protect, admin, upload.single('image'), createMenuItem);
router.put('/:id', protect, admin, upload.single('image'), updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;