const express = require('express');
const router = express.Router();
const controller = require('../controllers/phaseController');

router
.post('/', controller.registerPhase)
.delete('/:id', controller.deletePhase)
.get('/', controller.listPhase)
.put('/:id', controller.updatePhase);

module.exports = router;
