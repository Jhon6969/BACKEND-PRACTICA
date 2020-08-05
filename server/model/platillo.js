const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let PlatilloSchema = new Schema({

    strNombre: {
        type: String,
        required: [true, 'Favor de agregar el nombre del Platillo']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Favor de agregar la descripcion del Platillo']
    },
    strIngredientes: {
        type: String,
        required: [true, 'Favor de agregar el ingredientes del Platillo']
    },
    nmbPiezas: {
        type: Number,
        required: [true, 'Favor de agregar el piezas del Platillo']
    },
    nmbPrecio: {
        type: Number,
        required: [true, 'Favor de agregar el Precio del Platillo']
    },
    blnActivo: {
        type: Boolean,
        default: true
    },

});

module.exports = mongoose.model('Platillo', PlatilloSchema);