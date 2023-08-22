const express = require('express');
const router = express.Router();
const controller = require('../controllers/disciplineControllers');

router
.post('/', controller.registerDisciplines)
.get('/',controller.listDisciplines)

module.exports = router;
