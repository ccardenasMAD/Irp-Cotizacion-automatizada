import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/',// Set local directory for temporary file storage
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);// Generate unique filename using timestamp to prevent overwriting
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Enforce 10MB limit to protect server resources
});