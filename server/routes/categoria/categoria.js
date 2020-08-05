const express = require('express');
const Categoria = require('../../model/categoria');
const app = express();
const _ = require('underscore');

//Api para obtener las categorias 
//Ruta: http://localhost:3000/api/categoria/obtener 
app.get('/obtener', (req, res) => {

    Categoria.find()
        .then((data) => {
            if (data.length <= 0) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    msg: 'No existen registros de categoria',
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se han obtenido correctamente las categorias',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al intenar obtener las categorias',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

//Api para obtener por id las categorias
//Ruta: http://localhost:3000/api/categoria/obtener/:id

app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findById(id)
        .then((data) => {

            if (data.length <= 0) {
                return res.status(404).json({
                    ok: true,
                    status: 404,
                    msg: 'No hay categorias registradas',
                    count: data.length,
                    cont: data
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se ha consultado correctamente las categoria',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al obtener la categoria',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});


//Api para registrar las categorias
//Ruta: http://localhost:3000/api/categoria/registrar

app.post('/registrar', (req, res) => {

    let body = req.body;

    console.log(req.body);

    // CAMBIAR LA PRIMERA LATRA A MAYUSCULA Y LO DEMÁS A MINUSCULAS 
    let strNombre = '';
    var regex = new RegExp(["^", body.strNombre, "$", ].join(""), "i");

    Categoria.find({ 'strNombre': regex }).then((estado) => {

        if (estado.length > 0) {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'La categoria ya existe, favor registrar otro.',
            });
        }

        strNombre = body.strNombre.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

        let categoria = new Categoria({

            strNombre: strNombre,
            strDescripcion: body.strDescripcion
        });


        Categoria.findOne({ 'strNombre': strNombre }).then((data) => {

            if (data) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Categoria ya existe'
                });
            }

            categoria.save()
                .then((resp) => {
                    res.status(200).send({
                        estatus: '200',
                        err: false,
                        msg: 'Success: Información insertada correctamente.',
                        cont: {
                            resp
                        }
                    });
                }).catch((err) => {
                    return res.status(400).json({
                        ok: false,
                        status: 400,
                        msg: 'Error al registrar la categoria',
                        err: Object.keys(err).length === 0 ? err.message : err
                    });

                });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            ok: false,
            status: 400,
            msg: 'Ha ocurrido un error con el servidor',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });

});

//Api para modificar las categorias
//Ruta: http://localhost:3000/api/categoria/modificar/:id

app.put('/modificar/:id', (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        'strNombre',
        'strDescripcion',
        'blnActivo'
    ]);

    Categoria.findByIdAndUpdate(id, body)
        .then((data) => {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'La categoria se ha actualizado exitosamente.',
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar actualizar la categoria',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

//Api para desactivar las categorias
//Ruta: http://localhost:3000/api/categoria/eliminar/:id

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Error al desactivar la categoria',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente la categoria',
            cont: resp
        });
    });
});

module.exports = app;