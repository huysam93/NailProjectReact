const express = require('express');
const router = express.Router();
const visitorsController = require('../controllers/visitors_controller');

router.post('api/visitors', visitorsController.recordVisit);
router.get('api/visitors/stats', visitorsController.getVisitorStats);

module.exports = router;