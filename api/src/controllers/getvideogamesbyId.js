const axios  = require("axios");
const {Videogame, Genre} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env;


const GetVideogamesbyId = async (id)=> {
    //busqueda en la base de datos (el UUID contiene "-")
    if (id.includes("-")){
    const DBDATA = await Videogame.findByPk( id,
       {include:[{ 
        model: Genre, 
        attributes: ["name"], 
        through: { attributes: []}
    }]
})
if (!DBDATA) throw Error(`Request failed with status code 404. There is no videogame with the id ${id}`); // Si no encontro nada retornamos un error

const { name, background_image, platforms, released, rating, genres, description } = DBDATA.dataValues;

const vgDB = {
        id,
        name, 
        background_image,
        platforms,
        released, 
        rating, 
        genres: genres?.map((genre) => genre.name),
        description
    }
    return vgDB
} else {
    // Busqueda en la api si no contiene "-"
    const endpoint = `https://api.rawg.io/api/games/${id}?key=${API_KEY}` 
    const resultData = await axios.get(endpoint)
    const vgByIdRaw = resultData.data;
    const { name, background_image, platforms, released, rating, genres, description } = vgByIdRaw;
    
    const vgDB = {
        id, 
        name, 
        background_image, 
        platforms: platforms?.map(platform => platform.platform.name),
        released, 
        rating,
        genres: genres?.map(genre => genre.name),
        description
    };
    return vgDB;
};
}

module.exports = GetVideogamesbyId