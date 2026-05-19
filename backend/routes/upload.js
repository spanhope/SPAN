const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, WEBP, and GIF images are accepted'));
        }
    }
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided. Use field name "image".' });
        }

        const folder = req.body.folder || 'span-blog';
        const caption = req.body.caption || '';

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    context: caption ? { alt: caption } : undefined,
                    resource_type: 'image',
                    transformation: [
                        { quality: 'auto', fetch_format: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        res.json({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format
        });
    } catch (err) {
        if (err.message && err.message.startsWith('Only')) {
            return res.status(400).json({ error: err.message });
        }
        if (err.error && err.error.http_code === 401) {
            return res.status(500).json({ error: 'Cloudinary authentication failed. Check your API keys.' });
        }
        next(err);
    }
});

router.delete('/:public_id(*)', async (req, res, next) => {
    try {
        const public_id = req.params.public_id;
        const result = await cloudinary.uploader.destroy(public_id);
        if (result.result === 'ok' || result.result === 'not_found') {
            res.json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ error: 'Image not found or already deleted' });
        }
    } catch (err) { next(err); }
});

module.exports = router;