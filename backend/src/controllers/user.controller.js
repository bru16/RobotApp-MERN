export const getFavorite = async (req, res) => {
    const user = await res.locals.user.execPopulate("favoriteRobots");
    const robots = user.favoriteRobots;;
    res.json(robots).status(204);
}

export const deleteFavoriteRobot = async (req, res) => {
    const id = req.params.robotId;
    res.locals.user.favoriteRobots = res.locals.user.favoriteRobots.filter(r => !r._id.equals(id));
    const user = await res.locals.user.save().then(user => user.execPopulate("favoriteRobots"));
    res.json(user).status(204);
}

export const addFavoriteRobot = async (req, res) => {
    const { robot } = req.body
    res.locals.user.favoriteRobots.push(robot);
    const user = await res.locals.user.save().then(user => user.execPopulate("favoriteRobots"));   //update
    res.json(user).status(204);
}