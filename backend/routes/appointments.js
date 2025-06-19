const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments_controller');

router.get('/appointments', appointmentsController.getAllAppointments);
router.post('/appointments', appointmentsController.createAppointment);
router.put('/appointments/:id', appointmentsController.updateAppointmentStatus);
router.delete('/appointments/:id', appointmentsController.deleteAppointment);

module.exports = router;
