const express = require('express');
const app = express();

//importación de rutas 

app.use('/categoria', require('./categoria/categoria'));
app.use('/platillo', require('./platillo/platillo'));


module.exports = app;