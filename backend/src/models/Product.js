import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    description: String,
    img: Array
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema);