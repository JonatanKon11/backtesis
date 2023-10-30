const mongoose = require("mongoose");

const Schema = mongoose.Schema

const DeudorSchema = new Schema({
    dni: {
        type: Number,
    },
    cuit: {
        type: Number,
    },
    numeroCheque:{
        type: Number,
    },
    monto: {
        type: Number,
    }
})

const Deudor = mongoose.model('deudor', DeudorSchema)
module.exports = Deudor;