const axios = require ("axios");
const {Videogame, Genre} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env;

const GetVideogames = async ()=> {

    //Busqueda en la base de datos
    const DBDATA = await Videogame.findAll({ 
        include:[{ 
        model: Genre,
        attributes: ["name"], // se le pide que solo incluya los atributos de la columna "name".
        through: { attributes: []} // Para que no seleccione atributos de la tabla intermedia, solo la relacion en si
    }]
});
const allvgDB = DBDATA.map((vg) => {
    const {id, name, background_image, rating, genres } = vg 
    return {
        id, 
        name, 
        background_image, 
        rating, 
        genres: genres?.map(genre => genre.name) 
    }
})
//Busqueda en la api
const endpoint = `https://api.rawg.io/api/games?key=${API_KEY}`
const pageNum = 15 //Cantidad de resultados que se quiere obtener por pagina
const maxVg = 100 // Cantidad total de vg 
const totalRequest = Math.ceil(maxVg/pageNum) // Cantidad de solicitudes necesarias a la api, en este caso serian 7
const apivgPromises = [] // Almacenamiento de las promesas que le vamos a pushear con el for mas abajo

for (let page = 1; page <= totalRequest; page++) {
apivgPromises.push(axios.get(`${endpoint}&page_size=${pageNum}&page=${page}`)) // hace varias solicitudes a la api pusheando cada promesa al array de arriba
}
const promisesResult = await Promise.all(apivgPromises) // almacena todas las respuestas de las promesas

const allApiVg = promisesResult.flatMap(res => res.data.results) // almcena los resultados de la respuestas de las promesas

let apiVgClean = allApiVg?.map(vg => {
    const {id, name, background_image, rating, genres } = vg
    return {
        id, 
        name, 
        background_image, 
        rating, 
        genres: genres.map((genre) => genre.name) 
    }
})

apiVgClean = apiVgClean.slice(0, maxVg);
const allVideoGames = [...allvgDB, ...apiVgClean];

return allVideoGames;
}

module.exports = GetVideogames