const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Accept images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Desteklenmeyen dosya formatı! Sadece resim ve PDF dosyaları yüklenebilir.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Single file upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Dosya yüklenemedi!' });
        }
        
        // Return the file information
        res.json({
            message: 'Dosya başarıyla yüklendi',
            file: {
                filename: req.file.filename,
                path: `/uploads/${req.file.filename}`,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Dosya yükleme hatası', error: error.message });
    }
});

module.exports = router; 