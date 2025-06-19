const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews_controller');

router.get('/reviews', reviewsController.getAllReviews);
router.post('/reviews', reviewsController.createReview);
router.put('/reviews/:id', reviewsController.updateReview);
router.delete('/reviews/:id', reviewsController.deleteReview);

module.exports = router;
