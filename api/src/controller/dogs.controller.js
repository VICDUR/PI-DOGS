const { apiAll } = require('../helpers/getApiDogs.js');
const { Dog, Temperament } = require('../db.js');




//  GET "/dogs" : obtener todo el listado de dogs
const getAllDogs = async (req, res, Next) =>{
    const { name } = req.query;
    try {
        if(!name){   
            const allInfoDog = await apiAll();
            return res.status(200).json( allInfoDog );
        }
         Next();
    
    } catch (error) {
        res.status(404).json({ message: error.message });
        
    };
};



//  GET "/dog?name=pug": obtener listado de dogs por name
const getDog = async (req, res) =>{
    
    const { name } = req.query;

    try {   
        const allInfoDog = await apiAll()
        const findName = allInfoDog.filter( ele => ele.name.toLowerCase().includes(name.trim().toLowerCase()));
        
        if(findName.length === 0 ) throw new Error('Ingrese alguna palabra.');
        res.status(200).json(findName);

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    };
};



// GET /id: Obtener  el detalle por id de dog 
const getDogsId = async (req, res) =>{
    const { id } = req.params;

    try {
        const allInfoDog = await apiAll()
        const findId = allInfoDog.find( ele => ele.id === id);
        
        findId
            ? res.status(200).json(findId)
            : res.status(404).json('Not found for id.')

    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
        
    }
}



// Crear datos dog --> formulario
const createtDogs = async (req, res) =>{
    const { name, height, weight, lifeSpan, image, temperament } = req.body;
    try {
        if( !name || typeof name !== 'string' || !height || !weight ){
            res.status(406).json('No se pudo crear... vuelva a intentarlo')
        };  

        let createDog = await Dog.create({
            name,
            height,
            weight,
            lifeSpan : undefined || 'none', 
            image,  
        });

        createDog.addTemperament( temperament );

        const nuevoPerro = Dog.findByPk( createDog.id, { include: {model: Temperament}})
        
        res.status(201).json( nuevoPerro );
        

    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
        
    }
};



module.exports = {
    getAllDogs,
    getDog,
    getDogsId,
    createtDogs,
};