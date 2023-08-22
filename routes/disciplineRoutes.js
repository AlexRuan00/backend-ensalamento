const express = require('express');
const router = express.Router();
const controller = require('../controllers/disciplineControllers');

router
.post('/', controller.registerDisciplines)

module.exports = router;
