const { Router } = require("express");
const getGenresHandler = require("../handlers/genresHandlers");

const genresRouter = Router()

genresRouter.get("/", getGenresHandler);

module.exports = genresRouter