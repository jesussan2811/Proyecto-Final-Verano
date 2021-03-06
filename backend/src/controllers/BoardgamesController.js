const connection = require('../config/connections');

function listar(req, res){
        if(connection) {
            let sql = "SELECT B.*, F.FID FROM Boardgames B LEFT JOIN Favorites F on F.IdBoardgame = B.BID;";

            connection.query(sql, (err, data) => {
                if(err){
                    res.status(400).json(err);
                } else {
                    res.json(data);
                }
            })
        }
}

function obtenerBoardgame(req, res) {
    if(connection){
        const {id} = req.params;

        let sql = `SELECT B.*, F.FID FROM Boardgames B LEFT JOIN Favorites F on F.IdBoardgame = B.BID WHERE BID = ${connection.escape(id)}`;
        
        connection.query(sql, (err, boardgame) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(boardgame === undefined || boardgame.length === 0)
                    mensaje = "Boardgame no encontrado";

                res.json({result: boardgame[0], mensaje});
            }
        });

    }
}


function crearBoardgame(req, res) {
    if(connection){
        console.log(req.body);
        const boardgame = req.body;

                /*NOMBRE(NAME)*/
        if(!boardgame.BName){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(boardgame.BName.length > 80 && boardgame.BName){
            return res.status(400).send({error: true, mensaje: "La longitud debe de ser de menos de 80 caracteres."});            
        }

                /*PUBLICISTA(PUBLISHER)*/
        if(!boardgame.Publisher){
            return res.status(400).send({error: true, mensaje: "El Publisher es obligatorio"});
        }

        if(boardgame.Publisher.length > 60 && boardgame.Publisher){
            return res.status(400).send({error: true, mensaje: "La longitud debe de ser de menos de 80 caracteres."});            
        }

                /*CATEGORIA(CATEGORY)*/
        if(!boardgame.Category){
            return res.status(400).send({error: true, mensaje: "La Categoria es obligatorio"});
        }

        if(boardgame.Category.length !== 2 && boardgame.Category){
            return res.status(400).send({error: true, mensaje: "La longitud debe de ser de 2 caracteres."});            
        }

                /*DESCRIPCION(DESCRIPTION)*/
        if(boardgame.BDescription.length > 200 && boardgame.BDescription){
            return res.status(400).send({error: true, mensaje: "La longitud debe de ser de menos de 80 caracteres."});            
        }

                /*A??O(YEAR)*/
        if(boardgame.BYear.length !== 4 && boardgame.BYear){
            return res.status(400).send({error: true, mensaje: "El a??o debe tener 4 digitos."});            
        }

        let sql = "INSERT INTO Boardgames set ?";

        connection.query(sql, [boardgame], (err, data) => {
            if(err) {
                res.status(400).json(err);
            } else {
                res.json({error: false, result: data, mensaje: "Boardgame creado con ??xito."})
            }
        })
    }
}

function editarBoardgame(req, res) {
    if(connection) {
        const { id } = req.params;
        const boardgame = req.body;

        let sql = "UPDATE Boardgames set ? WHERE BID = ?";

        connection.query(sql, [boardgame, id], (err, data) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0)
                    mensaje ="La informaci??n es la misma";
                else
                    mensaje ="Persona actualizada con exito"
                res.json({error: false, result: data, mensaje});
            }
        });
    }
}

function eliminarBoardgame(req, res){
    if(connection) {
        const {id} = req.params;

        let sql = "DELETE FROM Boardgames WHERE BID = ?";
        connection.query(sql, [id], (err, data) => {
            if(err){
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0)
                    mensaje = "Boardgame no encontrada";
                else
                    mensaje = "Boardgame eliminada con ??xito.";
                res.json({error: false, result: data, mensaje});
            }
        });

    }
}

function listarFavorites(req, res){
    if(connection) {
        let sql = "SELECT F.FID, B.BName, B.Publisher, B.Category, B.BYear FROM Favorites F inner join Boardgames B on B.BID = F.IdBoardgame";

        connection.query(sql, (err, data) => {
            if(err){
                res.status(400).json(err);
            } else {
                res.json(data);
            }
        })
    }
}

function agregarFavorite(req, res){
    if(connection){
        const { IdBoardgame } = req.params.id;

        let sql = "INSERT INTO favorites set ?";

        connection.query(sql, [IdBoardgame], (err, data) => {
            if(err) {
                res.status(400).json(err);
            } else {
                res.json({error: false, result: data, mensaje: "Favorite a??adido con ??xito."})
            }
        })
    }
}

function eliminarFavorite(req, res){
    if(connection) {
        const {id} = req.params;

        let sql = "DELETE FROM Favorites WHERE IdBoardgame = ?";
        connection.query(sql, [id], (err, data) => {
            if(err){
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0)
                    mensaje = "Favorite no encontrada";
                else
                    mensaje = "Favorite eliminada con ??xito.";
                res.json({error: false, result: data, mensaje});
            }
        });

    }
}

module.exports = {
    listar,
    obtenerBoardgame,
    crearBoardgame,
    editarBoardgame,
    eliminarBoardgame,
    listarFavorites,
    agregarFavorite,
    eliminarFavorite
}