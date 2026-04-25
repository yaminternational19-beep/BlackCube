import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.resolve('uploads');
console.log('MULTER PID:', process.pid);
console.log('MULTER UPLOAD DIR:', uploadsDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter - only images
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Multer upload instance
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: imageFileFilter
});

// Resume/file upload instance (allows PDF/DOC/DOCX/images)
const resumeFileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.mimetype.startsWith('image/') || allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Please upload PDF, DOC, DOCX or image files.'));
  }
};

export const resumeUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: resumeFileFilter
});

// Image compression middleware
export const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  if (!req.file.mimetype.startsWith('image/')) {
    return next();
  }

  try {
    const filePath = req.file.path;
    const compressedPath = filePath.replace(path.extname(filePath), '.webp');
    
    // Compress and convert to WebP format
    await sharp(filePath)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(compressedPath);

    // Delete original file
    fs.unlinkSync(filePath);

    // Update file info
    req.file.path = compressedPath;
    req.file.filename = path.basename(compressedPath);
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    console.error('Image compression error:', error);
    // If compression fails, continue with original file
    next();
  }
};

export const compressFiles = async (files) => {
  const processed = [];

  for (const file of files) {
    if (!file.mimetype.startsWith('image/')) {
      processed.push(file);
      continue;
    }

    try {
      const filePath = file.path;
      const compressedPath = filePath.replace(path.extname(filePath), '.webp');

      await sharp(filePath)
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(compressedPath);

      fs.unlinkSync(filePath);

      processed.push({
        ...file,
        path: compressedPath,
        filename: path.basename(compressedPath),
        mimetype: 'image/webp'
      });
    } catch (error) {
      console.error('Image compression error:', error);
      processed.push(file);
    }
  }

  return processed;
};

