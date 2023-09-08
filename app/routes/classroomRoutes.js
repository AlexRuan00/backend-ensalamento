const express = require('express');
const router = express.Router();
const controller = require('../controllers/classroomControllers');

router
.post('/', controller.registerClassroom)
.get('/', controller.listClassrooms)
.delete('/:id', controller.deleteClassroom)
.put('/:id', controller.updateClassroom)

module.exports = router;