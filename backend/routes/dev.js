const express = require('express');
const router = express.Router();
const devController = require('../controllers/devController');

router.get('/download-db', devController.downloadDatabase);

module.exports = router;
