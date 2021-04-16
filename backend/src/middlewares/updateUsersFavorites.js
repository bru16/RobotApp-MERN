import User from '../models/User'
export const updateFavorites = async (req, res, next) => {
    const id = req.params.productId;
    const users = await User.find({ favoriteRobots: { $elemMatch: { $eq: id } } }).populate() // gets all the users that have that particular robot in their favorites
    console.log(users);
    users.forEach(async (user) => {
        console.log(user.favoriteRobots)
        user.favoriteRobots = user.favoriteRobots.filter(r => !r._id.equals(id));
        await user.save();
    });
    next();
}