require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const { API_KEY } = process.env;


// Trae la data necesaria de la API Dog requerida por mi modelo Dog lista para se llamada en mi appiAll
const getApiDogs = async ( ) => {
       
    try {
        const urlApiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        return await urlApiDogs.data.map( item => (
            {
                id:            item.id,   
                name:          item.name,
                height:        item.height.metric,
                weight:        item.weight.metric,
                image:         item.image.url,
                lifeSpan:      item.life_span,   
                temperament:   item.temperament,
            }
        ));
    } catch (error) {
        console.log(`error getApiDogs`, error.message )
        
    };
};


// Trae y Reune todo los temperamentos  de la api dog listo para la precarga a la DB Temperamet
const getApiTemperaments = async () => {

    try {
        const apiTemperaments = await axios
        .get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
        .then(response => response.data);

    //arreglo que contendra toda la data de temperamentos no repetidos. 
    let resultTemperaments = [];

    apiTemperaments.forEach(item => {

        let temperaments = item.temperament?.split(', ');
        
        temperaments?.forEach(item => {
            if (!resultTemperaments.includes(item)) {
                resultTemperaments.push(item);
            };
        });

    });

    const arrayTempFinal = resultTemperaments.map( el => ({ name: el}) );

    Temperament.bulkCreate( arrayTempFinal)
        
    } catch (error) {
        console.log(error.message)
        
    }

};



// Reune toda la info de dog  "DB" como "Api Dog" lista para utilizar en los controllers
const apiAll = async () => {

    try {
           // traer todo los  datos de la DB Dog (generados por mi formulario dog)
    const dbDogs = await Dog.findAll( { include: Temperament });
    // mapear la info de la DB
    let infDbDogs = dbDogs.map(item => (
        { 
            id:           item.dataValues.id,
            name:         item.dataValues.name,
            height:       item.dataValues.height,
            weight:       item.dataValues.weight,
            lifeSpan:     item.dataValues.lifeSpan,
            image:        item.dataValues.image,
            temperament:  item.dataValues.temperaments.map(item => item.name).join(', ')
        }    
    )
);

// traer info de la Api dog
const apiDog = await getApiDogs();

// retornar todo lo info de dog tanto DB como api Dog
return [ ...infDbDogs, ...apiDog ];
        
    } catch (error) {
        console.log(`error getApiTemperaments`, error.message )
    };
 
};





module.exports = {
    getApiDogs,
    getApiTemperaments,
    apiAll

};