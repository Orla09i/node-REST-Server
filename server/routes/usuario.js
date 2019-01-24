const express = require('express');

const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body; //Obtener información del POST

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //Guardar usuario
    usuario.save((err, usuarioDB) => {

        // En caso de error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //No mandar el password
        // usuarioDB.password = null;

        // Respuesta correcta
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

module.exports = app;