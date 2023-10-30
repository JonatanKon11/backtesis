const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require('dotenv').config();

console.log(dotenv.parsed);

const app = express();
app.use(express.json());

//initialize DB
require('./initDB')();

app.all('/test', (req, res) =>{
    
    console.log(req.body);
    res.send(req.body);
});

//const PORT = 5000
app.get('/products', (req, res, next) => {
})
const PadronRoute = require('./Routes/Padron.route');
const DeudorRoute = require('./Routes/Deudor.route');
//const { default: mongoose } = require("mongoose");
app.use('/padron', PadronRoute);
app.use('/deudor', DeudorRoute);

app.use((req, res, next) => {
    
    next(createError(404, 'Not found'));
});

//error handler
app.use((err, req, res, next) =>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('puerto escuchando ' + PORT));
