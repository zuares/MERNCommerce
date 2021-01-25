const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// upload image

router.post('/', auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ message: 'No files were uploaded.' });
        const file = req.files.file;
        if (file.size > 1024 * 1024 * 5) {
            removeTemp(file.tempFilePath);
            return res.status(400).json({ message: 'Size too large' })
        };
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTemp(file.tempFilePath);
            return res.status(400).json({ message: 'Invalid format' });
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "MernCommerce" }, async (err, result) => {
            if (err) throw err;
            removeTemp(file.tempFilePath);
            res.json({ public_id: result.public_id, url: result.secure_url });
        })

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        console.log(public_id);
        if (!public_id) return res.status(400).json({ message: "No image selected" });

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({ message: "Deleted image" })
        })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    });
}

module.exports = router;