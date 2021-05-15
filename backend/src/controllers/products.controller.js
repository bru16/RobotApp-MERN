import Product from '../models/Product'
import fs from 'fs'
import path from 'path'

export const createProduct = async (req, res) => {
    console.log(req.body)

    if (!process.env.NODE_ENV === 'test' && !req.files) return res.status(403).json({ message: "files not found" });
    const img = req.files?.map(image => { return `http://localhost:${process.env.PORT}/${image.path}` }) || ''  //change
    const name = req.body.robot[0];
    const description = req.body.robot[1];
    const video = req.body.robot[2];

    const robot = new Product({
        name,
        description,
        img,
        video
    });
    const robotSaved = await robot.save();
    console.log(robotSaved);
    res.status(200).json({ robotSaved });
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products).status(200);
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.json(product).status(200);
}

export const updateProductById = async (req, res) => {
    const name = req.body.robotName;
    const description = req.body.robotDescription;
    const updatedRobot = await Product.findByIdAndUpdate(req.params.productId, { name, description }, { new: true });
    res.status(204).json(updatedRobot);
}

export const deleteProductById = async (req, res) => {
    const robot = await Product.findById(req.params.productId);
    const images = robot.img;
    await Product.findByIdAndDelete(req.params.productId);
    var imagesPath = path.join(__dirname, '../../uploads/');   // path where images are stored.
    images.forEach(img => {
        var temporaryPath = imagesPath.concat(img.replace(`http://localhost:${process.env.PORT}/uploads\\`, ""));  //change
        fs.unlink(temporaryPath, (err) => {
            (err) ? console.log(err) : console.log('image deleted successfully')
        })
    });
    res.status(204).json();
}