import { Router } from 'express';
import { upload, resumeUpload, compressImage, compressFiles } from '../middleware/upload.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok } from '../utils/ApiResponse.js';

const router = Router();

// Single image upload endpoint
router.post('/image', upload.single('image'), compressImage, asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Return the file URL
  const host = `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${host}/uploads/${req.file.filename}`;

  res.json(ok({ 
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  }));
}));




// Multiple images upload endpoint
router.post('/images', upload.array('images', 10), asyncHandler(async (req, res) => {
  if (!req.files || (req.files ).length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' });
  }

  // Compress each file
  const processedFiles = await compressFiles(req.files );

  const files = processedFiles.map(file => ({
    url: `/uploads/${file.filename}`,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype
  }));

  res.json(ok({ files }));
}));

// Resume upload endpoint (supports pdf/doc/docx/images)
router.post('/resume', resumeUpload.single('resume'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  let file = req.file;

  if (file.mimetype.startsWith('image/')) {
    const [compressed] = await compressFiles([file]);
    file = compressed;
  }

 const host = `${req.protocol}://${req.get('host')}`;

const fileUrl = `${host}/uploads/${file.filename}`;

  res.json(ok({
    url: fileUrl,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype
  }));
}));

export default router;

