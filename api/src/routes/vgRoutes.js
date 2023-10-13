const { Router } = require("express");
const {getVgByIdHandler, getvgHandler, postVgHandler} =require("../handlers/vgHandlers");

const vgRouter = Router()

vgRouter.get("/", getvgHandler);

vgRouter.get("/:id", getVgByIdHandler);

vgRouter.get("/name", getvgHandler)

vgRouter.post("/", postVgHandler)

module.exports = vgRouter