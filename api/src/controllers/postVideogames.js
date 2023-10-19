const {Videogame, Genre} = require("../db")


const postVg = async (vg) => {
    const { name, background_image, platforms, released, rating, genres, description } = vg
const newVg = await Videogame.create({
    name,
    background_image, 
    platforms, 
    released, 
    rating, 
    description
})
const genresDB = await Genre.findAll({where: {name: genres}})
await newVg.addGenres(genresDB);
return newVg
}

module.exports = postVg