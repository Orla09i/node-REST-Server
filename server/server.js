require('./config/config');


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


//Habilitar la carpeta punlic para que se pueda acceder de cualquier lugar
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuración global de rutass
app.use(require('./routes/index'));


// Conexión con MongoDB
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;
    console.log('Base de datos Online');

});


//Declaración del puerto
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto:', process.env.PORT);
});