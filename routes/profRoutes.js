const express = require('express');
const router = express.Router();
const controller = require('../controllers/profControllers');

router
.post('/', controller.registerProfessor);

module.exports = router;
