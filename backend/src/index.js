const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Para ver si nos pudimos conectar
require('./config/connections');


// Rutas
app.use(require('./routes/BoardgameRoute'));


// Levantar el servidor
app.listen(app.get('port'), error => {
    if(error) {
        console.log("Ha ocurrido un error");
    } else {
        console.log("Servidor en puerto: ", app.get('port'));
    }
})