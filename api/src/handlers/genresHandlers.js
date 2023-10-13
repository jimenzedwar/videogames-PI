const getGenres = require("../controllers/getGenres");

const getGenresHandler = async (req, res) => {
    try {
        const allGenres = await getGenres()
        return res.status(200).send(allGenres)
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
    }

    module.exports = getGenresHandler