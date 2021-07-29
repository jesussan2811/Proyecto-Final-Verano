const express = require('express');

const routes = express.Router();

const { listar, obtenerBoardgame, crearBoardgame, editarBoardgame, eliminarBoardgame, agregarFavorite, eliminarFavorite, listarFavorites } = require('../controllers/BoardgamesController');

routes.get('/boardgame', listar);

routes.get('/boardgame/:id', obtenerBoardgame );

routes.post('/boardgame', crearBoardgame);

routes.put('/boardgame/:id', editarBoardgame);

routes.delete('/boardgame/:id', eliminarBoardgame);

routes.post('/favorite/:id', agregarFavorite);

routes.delete('/favorite/:id', eliminarFavorite);

routes.get('/favorite',listarFavorites);

module.exports = routes;