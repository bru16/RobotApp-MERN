import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    description: String,
    img: Array,
    video: String
}, {
    timestamps: false,
    versionKey: false
})

export default model('Product', productSchema);