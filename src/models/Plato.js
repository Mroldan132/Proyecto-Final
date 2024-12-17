import {Schema, model} from 'mongoose'

const platoSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true},
    imagenes: [{type: String}],
    creado: {type: Date, default: Date.now()}
})

export default model('Plato', platoSchema)