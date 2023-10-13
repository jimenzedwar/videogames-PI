const axios = require ("axios");
const {Videogame, Genre} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env;

const GetVideogames = async ()=> {
    const DBDATA = await Videogame.findAll({ // Se obtiene los vg de la DB.
        include:[{ // Se usa para incluir una tabla relacionada.
        model: Genre, // en este caso nos interesa incluir Genre.
        attributes: ["name"], // se le pide que solo incluya los atributos de la columna "name".
        through: { attributes: []} // Se utiliza para decir que no incluya nada de la tabla de relacion.
    }]
});

const allvgDB = DBDATA.map((vg) => {
    const {id, name, background_image, rating, Genres } = vg 
    return {
        id, 
        name, 
        background_image, 
        rating, 
        genres: Genres.map((genre) => genre.name) 
    }
})

const endpoint = `https://api.rawg.io/api/games?key=${API_KEY}` // declaramos el endpoint con el apiKey
const pageNum = 15 //Cantidad de resultados que se quiere obtener por pagina
const maxVg = 100 // Cantidad total de vg 
const totalRequest = Math.ceil(maxVg/pageNum) // Cantidad de solicitudes necesarias a la api, en este caso serian 7
const apivgPromises = [] // Almacenamiento de las promesas que le vamos a pushear con el for mas abajo

for (let page = 1; page <= totalRequest; page++) {
apivgPromises.push(axios.get(`${endpoint}&page_size=${pageNum}&page=${page}`)) // hace varias solicitudes a la api pusheando cada promesa al array de arriba
}
const promisesResult = await Promise.all(apivgPromises) // almacena todas las respuestas de las promesas

const allApiVg = promisesResult.flatMap(res => res.data.results) // almcena los resultados de la respuestas de las promesas
// Lo que hace es aplanar el array para quitar los subindices de array

let apiVgClean = allApiVg?.map(vg => {
    const {id, name, background_image, rating, genres } = vg //Aca genres esta en minscula porque lo requerimos de la Api, arriba va en mayuscula porque la requerimos del modelo
    return {
        id, 
        name, 
        background_image, 
        rating, 
        genres: genres.map((genre) => genre.name) 
    }
})

apiVgClean = apiVgClean.slice(0, maxVg); //limito cantidad de resultados obtenidos de la API, seleccionamos elementos desde el primer elemento del array, indice 0 
const allVideoGames = [...allvgDB, ...apiVgClean]; // aqui unimos tanto los datos de la DB como de la api

return allVideoGames; // por ultimo retornamos todos los datos
}

module.exports = GetVideogames