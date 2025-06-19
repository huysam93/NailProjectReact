const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts_controller');

router.get('/contacts', contactsController.getAllContacts);
router.post('/contacts', contactsController.createContact);
router.delete('/contacts/:id', contactsController.deleteContact);

module.exports = router;
