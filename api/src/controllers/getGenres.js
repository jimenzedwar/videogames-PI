const axios  = require("axios");
const {Genre} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env;


let DBFull = false 

const getGenres = async () => {
    if (DBFull) {
        const genresDB = await Genre.findAll()
        const genresCleanDB = genresDB.map(genre => genre.name)
        return genresCleanDB
    } else {
    const endpoint = `https://api.rawg.io/api/genres?key=${API_KEY}` 
    const allGenresApi = await axios.get(endpoint)
    const dataApi = allGenresApi.data.results
    const genresCleanApi = dataApi.map(genre => genre.name)

    const promises = genresCleanApi.map((genre) => {
        return Genre.findOrCreate({
            where: { name: genre }
        });
    });
    await Promise.all(promises);
    DBFull = true
    return genresCleanApi
}
}
module.exports = getGenres