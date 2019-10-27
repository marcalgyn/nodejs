const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('usuario', Usuario)