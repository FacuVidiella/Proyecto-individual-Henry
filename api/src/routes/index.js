const { Router, request } = require('express');
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
            response2.data.results.forEach( p => {
                result.push(p)
            });
            let response3 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=3`);
            response3.data.results.forEach(p => {
                result.push(p)
            });
            let response4 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=4`);
            response4.data.results.forEach(p => {
                result.push(p)
            });
            let response5 = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=5`);
            response5.data.results.forEach(p => {
                result.push(p)
            });
           
            
            if(!req.query.name){
                let allGames = await Videogame.findAll({
                    include: 'Genres'
                })
                if(allGames && allGames.length)result = result.concat(allGames?.map(m => m.dataValues))
                console.log(allGames)
                result = result.map(p => {
                    return {
                        id: p.id,
                        name: p.name,
                        background_image: p.background_image,
                        genres: p.genres,
                        rating: p.rating
                    }
                }) 
                
            } else {
                let nameNormalized = req.query.name.toLowerCase();
                const gameBd = await Videogame.findAll({
                    where: {name: {[Op.iLike]: '%' + nameNormalized + '%'}},
                    include: 'Genres'
                })
                console.log(gameBd)
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
        let gameInBd = await Videogame.findByPk(idVideogame,{
            include: 'Genres'
        });
        console.log(gameInBd)
        let { name, background_image, description, releaseDate, rating, platforms} = gameInBd.dataValues;
         resultado = {
            name,
            background_image,
            genres: gameInBd.Genres,
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
    const { name, description, releaseDate, rating, platforms, genres} = req.body;
    console.log(genres)
    let platforms1 = platforms.join(' ')
    const newVideogame = await Videogame.create({
        name,
        description,
        releaseDate,
        rating,
        platforms: platforms1,
    })
    
    let gen = genres.map(m => Genre.findOne({
        where: {name: m},
        attributes: ['id']
    }));
    gen = await Promise.all(gen)
    
    gen.forEach(e => newVideogame.addGenres(e.dataValues.id, newVideogame.dataValues.id))
    
    res.status(200).json(newVideogame);
    
    
    
})


module.exports = router;
