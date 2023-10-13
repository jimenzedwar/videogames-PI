const { Router } = require('express');
const vgRouter = require('./vgRoutes');
const genresRouter = require('./genresRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", vgRouter)
router.use("/genres", genresRouter)

module.exports = router;
