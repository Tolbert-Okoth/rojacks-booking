const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import 'fs' (File System)

const uploadDir = path.join(__dirname, '../uploads');

// --- 1. Define allowed file types ---
// We check the file extension AND the file's internal type
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const allowedExtnames = ['.jpeg', '.jpg', '.png', '.gif'];

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir); // Use the absolute path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Check file type
const checkFileType = (file, cb) => {
  // --- 2. Stricter validation ---
  const extname = allowedExtnames.includes(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimeTypes.includes(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Images Only! (jpeg, jpg, png, gif)'), false);
  }
};

// Initialize the upload middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
  // --- 3. Add file size limit ---
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 Megabytes
  }
});

module.exports = upload;