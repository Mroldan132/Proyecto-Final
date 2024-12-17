import {Schema, model} from 'mongoose'

const meseroSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    usuario: {type: String, required: true},
    contraseña: {type: String, required: true},
    dni: {type: String, required: true},
    creado: {type: Date, default: Date.now()}
})

export default model('Mesero', meseroSchema)
