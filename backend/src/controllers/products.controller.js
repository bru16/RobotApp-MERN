import Product from '../models/Product' // importo Esquema del modelo de datos de mongo.

export const createProduct = async (req, res) => {
    const { name, img, description } = req.body;
    const newProduct = new Product({ name, img, description });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products).status(200);
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.json(product);
}

export const updateProductById = async (req, res) => {
    const name = req.body.robotName;
    const description = req.body.robotDescription;
    const updatedRobot = await Product.findByIdAndUpdate(req.params.productId, { name, description }, { new: true });
    res.status(204).json(updatedRobot);
}

export const deleteProductById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
}