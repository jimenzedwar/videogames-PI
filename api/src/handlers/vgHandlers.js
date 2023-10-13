const getVgByName = require("../controllers/getVideogamebyName");
const GetVideogames = require("../controllers/getVideogames");
const GetVideogamesbyId = require("../controllers/getvideogamesbyId");
const postVg = require("../controllers/postVideogames");


//Handlers getAll y getName
const getvgHandler = async (req, res) => {
    const { name } = req.query
    try {
        const allvideoG = name? await getVgByName(name) : await GetVideogames()
        if (!allvideoG) {
            throw Error(`No videogames were found with the name ${name}`)
        }
        return res.status(200).send(allvideoG)
    } catch (error) {
        if (error.message.includes("were found")) {
            return res.status(404).send({error: error.message});
        }
        return res.status(500).send({error: error.message});
    }
    }

// Handler getId
    const getVgByIdHandler = async (req, res) => {
        const {id} = req.params
        try {
            const specVg = await GetVideogamesbyId(id)
            return res.status(200).send(specVg)
        } catch (error) {
            res.status(500).send({error: error.message});
        }
    }
    // handler post
    const postVgHandler = async (req, res) => {
        try {
            const vg = {...req.body}
            const newVg = await postVg(vg)
            return res.status(200).send(newVg)
        } catch (error) {
            res.status(500).send({error: error.message});
        }
    }
    


    module.exports = { getvgHandler, getVgByIdHandler, postVgHandler }


