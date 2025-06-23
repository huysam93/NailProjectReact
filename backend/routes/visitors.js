const express = require('express');
const router = express.Router();
const visitorsController = require('../controllers/visitors_controller');

router.post('/visitors', visitorsController.recordVisit);
router.get('/visitors/stats', visitorsController.getVisitorStats);

module.exports = router;