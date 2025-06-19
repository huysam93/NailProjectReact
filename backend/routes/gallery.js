const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery_controller');

router.get('/gallery', galleryController.getGalleryImages);
router.post('/gallery', galleryController.addGalleryImage);
router.delete('/gallery/:id', galleryController.deleteGalleryImage);

module.exports = router;
