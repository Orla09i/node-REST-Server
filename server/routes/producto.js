const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


module.exports = app;

//============================
// Obtener todos los productos
//=============================
app.get('/productos', (req, res) => {

    // Trae todo los productos
    // Populate: usuario categoria
    //Paginado

});


//============================
// Obtener un producto por ID
//=============================
app.get('/productos/:id', (req, res) => {

    // Populate: usuario categoria
    //Paginado

});

//============================
// Crear nuevo producto
//=============================
app.post('/productos', (req, res) => {

    // Grabar el usuario
    // grabar categoria

});

//============================
// Actualizar producto
//=============================
app.put('/productos/:id', (req, res) => {

    // Grabar el usuario
    // grabar categoria

});

//============================
// Borrar producto
//=============================
app.put('/productos/:id', (req, res) => {

    // Grabar el usuario
    // borrarlo en estado disponible

});