const axios  = require("axios");
const {Videogame, Genre} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require("sequelize")

const getVgByName = async (name)=> {

    const matchingVgDB = await Videogame.findAll({
        where: {
        name: {
            [Op.iLike]: `%${name}%`
        }
        },
        include: [
        {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] }
        }
        ]
    });

const matchingVgs = matchingVgDB.map((vg) => {
    const {id, name, background_image, platforms, released, rating, genres } = vg 
    return {
        id, 
        name, 
        background_image,
        platforms, 
        released,
        rating, 
        genres: genres?.map((genre) => genre.name) 
    }
})

    const endpoint = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}` // declaramos el endpoint con el apiKey y el name
    const resultData = await axios.get(endpoint)
    const resultApi = resultData.data.results

    
    const matchingVgApi = resultApi.filter(vg => { 
        return vg.name.toLowerCase().includes(name.toLowerCase());
     });
     

    const matchingVgsRaw = matchingVgApi.map((vg) => {
        const {id, name, background_image, platforms, released, rating, genres } = vg 
        return {
            id, 
            name, 
            background_image,
            platforms, 
            released, 
            rating, 
            genres: genres.map((genre) => genre.name) 
        }
    })
    const allMatchingVg = [...matchingVgsRaw, ...matchingVgs];
    const matchingVgClean = allMatchingVg.slice(0, 15);
    return allMatchingVg.length ? matchingVgClean
    : null;
};

module.exports = getVgByName