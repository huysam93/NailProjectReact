const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages_controller');

router.get('/messages', messagesController.getAllMessages);
router.post('/messages', messagesController.createMessage);

module.exports = router;
