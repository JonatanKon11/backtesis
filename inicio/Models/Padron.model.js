const mongoose = require("mongoose");

const Schema = mongoose.Schema

const PadronSchema = new Schema({
    dni: {
        type: Number,
        unique: true,
    },
    cuit: {
        type: Number,
        unique: true,
    },
    denominacion:{
        type: String,
    }
})

const Padron = mongoose.model('padron', PadronSchema)
module.exports = Padron;