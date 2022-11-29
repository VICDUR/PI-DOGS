const express = require('express');
const { getTemperament } = require('../controller/temperament.controller')

const router = express.Router();



router.get('/', getTemperament);


module.exports = router;