const express = require('express');
const router = express.Router();
const controller = require('../controllers/profControllers');

router
.post('/', controller.registerProfessor)
.delete('/:id', controller.deleteProfessor)
.get('/', controller.listProfessor)


module.exports = router;
