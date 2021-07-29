const connection = require('../config/connections');

function listar(req, res){
        if(connection) {
            let sql = "SELECT B.*, F.FID FROM Boardgames B inner join Favorites F on F.IdBoardgame = B.BID";

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
        const {id} = req.parms;

        let sql = `SELECT B.*, F.FID FROM Boardgames B INNER JOIN Favorites F ON F.IdBoardgame = B.BID WHERE BID = ${connection.escape(id)}`;
        
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

function crear(req, res) {
    if(connection){
        console.log(req.body);
        const boardgame = req.body;

                /*NOMBRE(NAME)*/
        if(!boardgame.Name){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(boardgame.Name.length > 80 && boardgame.Name){
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

        if(boardgame.Category.length === 2 && boardgame.Category){
            return res.status(400).send({error: true, mensaje: "La longitud debe de ser de 2 caracteres."});            
        }

                /*DESCRIPCION(DESCRIPTION)*/
        if(boardgame.Description.length > 200 && boardgame.Description){
            return res.status(400).send({error: true, mensaje: "La longitud debe de ser de menos de 80 caracteres."});            
        }

                /*AÑO(YEAR)*/
        if(boardgame.Year.length === 4 && boardgame.Year){
            return res.status(400).send({error: true, mensaje: "El año debe tener 4 digitos."});            
        }

        let sql = "INSERT INTO Boardgames set ?";

        connection.query(sql, [boardgame], (err, data) => {
            if(err) {
                res.status(400).json(err);
            } else {
                res.json({error: false, result: data, mensaje: "Boardgame creado con éxito."})
            }
        })
    }
}

function editar(req, res) {
    if(connection) {
        const { id } = req.params;
        const boardgame = req.body;

        let sql = "UPDATE Boardgames set ? WHERE id = ?";

        connection.query(sql, [boardgame, id], (err, data) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(data.changedRows === 0)
                    mensaje ="La información es la misma";
                else
                    mensaje ="Persona actualizada con exito"
                res.json({error: false, result: data, mensaje});
            }
        });
    }
}

function eliminar(req, res){
    if(connection) {
        const {id} = req.params;

        let sql = "DELETE FROM Boardgame WHERE id = ?";
        connection.query(sql, [id], (err, data) => {
            if(err){
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0)
                    mensaje = "Boardgame no encontrada";
                else
                    mensaje = "Boardgame eliminada con éxito.";
                res.json({error: false, result: data, mensaje});
            }
        });

    }
}

module.exports = {
    listar,
    obtenerBoardgame,
    crear,
    editar,
    eliminar
}