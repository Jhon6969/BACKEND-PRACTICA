const express = require('express');
const Platillo = require('../../model/platillo');
const app = express();
const _ = require('underscore');

//Api para obtener las categorias 
//Ruta: http://localhost:3000/api/platillo/obtener 
app.get('/obtener', (req, res) => {

    Platillo.find()
        .then((data) => {
            if (data.length <= 0) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    msg: 'No existen registros de Platillo',
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se han obtenido correctamente los Platillo',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al intenar obtener lao Platillos',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

//Api para obtener por id las categorias
//Ruta: http://localhost:3000/api/platillo/obtener/:id

app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;

    Platillo.findById(id)
        .then((data) => {

            if (data.length <= 0) {
                return res.status(404).json({
                    ok: true,
                    status: 404,
                    msg: 'No hay Platillo registradas',
                    count: data.length,
                    cont: data
                });
            }
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Se ha consultado correctamente las Platillo',
                count: data.length,
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                status: 500,
                msg: 'Error al obtener la Platillo',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});


//Api para registrar las categorias
//Ruta: http://localhost:3000/api/platillo/registrar

app.post('/registrar', (req, res) => {

    let body = req.body;

    console.log(req.body);

    // CAMBIAR LA PRIMERA LATRA A MAYUSCULA Y LO DEMÁS A MINUSCULAS 
    let strNombre = '';
    var regex = new RegExp(["^", body.strNombre, "$"].join(""), "i");

    Platillo.find({ 'strNombre': regex }).then((estado) => {

        if (estado.length > 0) {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'EL Platillo ya existe, favor registrar otro.',
            });
        }

        strNombre = body.strNombre.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

        let platillo = new Platillo({
            strNombre: strNombre,
            strDescripcion: body.strDescripcion,
            strIngredientes: body.strIngredientes,
            nmbPiezas: body.nmbPiezas,
            nmbPrecio: body.nmbPrecio,

        });


        Platillo.findOne({ 'strNombre': strNombre }).then((data) => {

            if (data) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: 'Platillo ya existe'
                });
            }

            platillo.save()
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
                        msg: 'Error al registrar la Platillo',
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
//Ruta: http://localhost:3000/api/platillo/modificar/:id

app.put('/modificar/:id', (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        'strNombre',
        'strDescripcion',
        'strIngredientes',
        'nmbPiezas',
        'nmbPrecio',
        'blnActivo'

    ]);
    Platillo.findByIdAndUpdate(id, body)
        .then((data) => {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'El Platillo se ha modificado exitosamente.',
                cont: data
            });
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar modificar el Platillo',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        });
});

//Api para desactivar las categorias
//Ruta: http://localhost:3000/api/platillo/eliminar/:id

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Platillo.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Error al desactivar el Platillo',
                err: Object.keys(err).length === 0 ? err.message : err
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente el Platillo',
            cont: resp
        });
    });
});

module.exports = app;