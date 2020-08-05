require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar las rutas
app.use('/api', require('./routes/index'));

//conxion a base de datos
mongoose.connect('mongodb://localhost:27017/Final', (err, res) => {

    if (err) throw err;
    console.log('Base de datos en linea');
});
//iniciar servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});