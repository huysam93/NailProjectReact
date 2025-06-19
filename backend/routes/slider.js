const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/slider_controller');

router.get('/slider', sliderController.getSliderImages);
router.post('/slider', sliderController.addSliderImage);
router.delete('/slider/:id', sliderController.deleteSliderImage);

module.exports = router;
