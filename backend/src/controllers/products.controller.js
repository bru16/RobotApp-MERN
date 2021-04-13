import Product from '../models/Product'

export const createProduct = async (req, res) => {
    console.log(req.files);
    const img = req.files.map(image => { return `http://localhost:4000/${image.path}` });   //change
    const name = req.body.robot[0];
    const description = req.body.robot[1];
    const video = req.body.robot[2];
    console.log(name, description, img,video);

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