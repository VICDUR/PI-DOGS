
const express = require('express');
const { getAllDogs, getDog, getDogsId, createtDogs } = require('../controller/dogs.controller');


const router = express.Router();

router.get('/', getAllDogs );
router.get('/',  getDog );
router.get('/:id', getDogsId );
router.post('/', createtDogs);


module.exports = router;


