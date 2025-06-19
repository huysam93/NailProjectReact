const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services_controller');

router.get('/services', servicesController.getAllServices);
router.post('/services', servicesController.createService);
router.put('/services/:id', servicesController.updateService);
router.delete('/services/:id', servicesController.deleteService);

module.exports = router;
