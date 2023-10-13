const axios  = require("axios");
const {Videogame, Genre} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env;


const GetVideogamesbyId = async (id)=> {

    if (id.includes("-")){
    const DBDATA = await Videogame.findbyPK( id, // Se obtiene el vg especifico de la DB.
       {include:[{ // Se usa para incluir una tabla relacionada.
        model: Genre, // en este caso nos interesa incluir Genre.
        attributes: ["name"], // se le pide que solo incluya los atributos de la columna "name".
        through: { attributes: []} // Se utiliza para decir que no incluya nada de la tabla de relacion.
    }]
})
if (!DBDATA) throw Error(`Request failed with status code 404. There is no videogame with the id ${id}`); // Si no encontro nada retornamos un error

const { name, background_image, platforms, released, rating, Genres, description } = DBDATA.dataValues;

const vgDB = {
        id,
        name, 
        background_image,
        platforms,
        released, 
        rating, 
        genres: Genres.map((genre) => genre.name),
        description
    }
    return vgDB
} else {
    const endpoint = `https://api.rawg.io/api/games/${id}?key=${API_KEY}` // declaramos el endpoint con el apiKey y el ID
    const resultData = await axios.get(endpoint)
    const vgByIdRaw = resultData.data;
    const { name, background_image, platforms, released, rating, genres, description } = vgByIdRaw;
    
    const vgDB = {
        id, 
        name, 
        background_image, 
        platforms: platforms.map(platform => platform.platform.name),
        released, 
        rating,
        genres: genres.map(genre => genre.name),
        description
    };
    return vgDB;
};
}

module.exports = GetVideogamesbyId