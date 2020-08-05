const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({

    strNombre: {
        type: String,
        required: [true, 'Favor de agregar el nombre del categoria']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Favor de agregar la descripcion del categoria']
    },
    blnActivo: {
        type: Boolean,
        default: true
    },

});

module.exports = mongoose.model('categoria', categoriaSchema);