const express = require('express');
const router = express.Router();
const controller = require('../controllers/ensalarControllers');

router.get('/',controller.ensalar);

module.exports = router;
