const express = require('express');

const routes = express.Router();

const { listar, obtenerBoardgame, crear, editar, eliminar } = require('../controllers/BoardgamesController');

routes.get('/boardgame', listar);

routes.get('/boardgame/:id', obtenerBoardgame );

routes.post('/boardgame', crear);

routes.put('/boardgame/:id', editar);

routes.delete('/boardgame/:id', eliminar);

module.exports = routes;