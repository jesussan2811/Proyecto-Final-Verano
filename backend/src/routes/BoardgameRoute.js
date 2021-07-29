const express = require('express');

const routes = express.Router();

const { listar, obtenerBoardgame, crearBoardgame, editar, eliminar, agregarFavorite } = require('../controllers/BoardgamesController');

routes.get('/boardgame', listar);

routes.get('/boardgame/:id', obtenerBoardgame );

routes.post('/boardgame', crearBoardgame);

routes.put('/boardgame/:id', editar);

routes.delete('/boardgame/:id', eliminar);

routes.post('/favorite/:id', agregarFavorite);

routes.delete('/favorite/:id', eliminarFavorite);

module.exports = routes;