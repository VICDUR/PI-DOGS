const { Temperament } = require('../db');


const getTemperament = async (req, res) =>{

    try {
         const temperametsAll = await Temperament.findAll();

        res.status(200).json( temperametsAll )

    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
        
    };
};




module.exports = {
    getTemperament
};