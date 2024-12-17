import {Schema, model} from 'mongoose'

const ordenSchema = new Schema({
    mesa: {type: String, required: true},
    nroDeOrden: {type: Number, required: true},
    //platillos y sus cantidades
    platillos: [{type: Schema.Types.ObjectId, ref: 'Plato', required: true}],
    cantidades: [{type: Number, required: true}], 
    estado: {type: String, required: true},
})

export default model('Orden', ordenSchema)