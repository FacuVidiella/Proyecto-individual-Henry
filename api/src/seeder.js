const axios  = require('axios');
require('dotenv').config();
const { DB_KEY } = process.env;
const { Genre, Videogame } = require ('./db.js')


var genreSeed = async function(){
    let response = await axios.get(`https://api.rawg.io/api/genres?key=${DB_KEY}`)
    let data = response.data.results;
    
    data.forEach(p => {
        Genre.create({
            id: p.id,
            name: p.name
        })
    })
}



module.exports = {
    genreSeed
};