const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genre, Videogame } = require('../db.js');
const { Op } = require('sequelize');
const Axios = require('axios');
const { default: axios } = require('axios');
require('dotenv').config();
const { DB_KEY } = process.env;




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/videogames', async (req, res) =>{
        try{
            let response = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}`);
            var result = response.data.results;
            let response2 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=2`);
            let result2 = response2.data.results;
            let response3 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=3`);
            let result3 = response3.data.results;
            let response4 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=4`);
            let result4 = response4.data.results;
            let response5 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=5`);
            let result5 = response5.data.results;
            result2.forEach(p => {
                result.push(p)
            });
            result3.forEach(p => {
                result.push(p)
            });
            result4.forEach(p => {
                result.push(p)
            });
            result5.forEach(p => {
                result.push(p)
            });           
            if(!req.query.name){
                result.push(await Videogame.findAll())
                result = result.map(p => {
                    return {
                        name: p.name,
                        background_image: p.background_image,
                        genres: p.genres
                    }
                }) 
            }else{
                let nameNormalized = req.query.name.toLowerCase();
                const gameBd = await Videogame.findAll({
                    where: {name: {[Op.iLike]: '%' + nameNormalized + '%'}}
                })
                let private = gameBd.map(p => 
                    p.dataValues
                );
                result = result.filter(p => p.slug.includes(nameNormalized));
                result = private.concat(result)
                result = result.slice(0, 15);
                
                              
            }           
               
            if(result.length){
                res.status(200).json(result);
            } else {
                res.status(404).json('No se encontraron resultados')
            }    
            } catch(error){
                res.status(404).send(error);
            }
    
        
        
    
    
});


router.get('/videogame/:idVideogame', async(req, res) => {
    const {idVideogame} = req.params;
    let resultado;
    if(idVideogame.length > 6){
        let gameInBd = await Videogame.findByPk(idVideogame);
        let { name, background_image, genres, description, releaseDate, rating, platforms} = gameInBd.dataValues;
         resultado = {
            name,
            background_image,
            genres,
            description,
            releaseDate,
            rating,
            platforms
        }  
    } else {
    let gameId = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${DB_KEY}`)
    let gameIdData = gameId.data
    let {name, background_image, genres, description, releaseDate, rating, platforms} = gameIdData; 
    resultado = {
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms
    }
   }
   res.status(200).json(resultado);
    
    

});


router.get('/genres', async(req, res) =>{
    try{
        const allGenres = await Genre.findAll();
        res.status(200).json(allGenres);
    } catch(error){
        res.status(404).json(error)
    }
    
})

router.post('/videogame', async(req, res) =>{
    const { name, description, releaseDate, rating, platforms} = req.body;
    try{
    const newVideogame = await Videogame.create({
        name,
        description,
        releaseDate,
        rating,
        platforms,
    })
    res.status(200).json(newVideogame);
    } catch (error){
        res.status(404).send(error)
    }
    
})


module.exports = router;
