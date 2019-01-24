const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

// ===================================
//Obtener lista de Usuarios por página
// ===================================

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ state: true }, 'nombre email role state google img') // primer argumento: Condición, segundo argumento: campos deseados
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            // En caso de error
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //Contar registros
            Usuario.count({ state: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });

        });

});

// ===================================
// Agregar un usuario
// ===================================

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

        //Para no mandar el password
        // usuarioDB.password = null;

        // Respuesta correcta
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

// ===================================
// Actualizar un usuario
// ===================================

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //Seleccionar campos validos para actualizar usando la libreria pick
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        // En caso de error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

// ===================================
// Borrar un usuario de la BD fisicamente o cambiando el estado state a false
// ===================================

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;


    let cambiaEstado = {
        state: false
    };
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { // borrar usuario fisicamente
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        // En caso de error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // En caso de no haber un usuario 
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });


    });

});

module.exports = app;