import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;        // las siguientes funciones tienen acceso al ID del user.
        const user = await User.findById(req.userId, { password: 0 });  // cuando me llega el user, no necesito su contrasena
        if (!user) return res.status(404).json({ message: 'User no found' });
        res.locals.user = user; // variable que accedo despues.
        next();
    } catch (error) {
        return res.status(500).json({ message: "Unauthorized" });
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);   // accedo al req.userId que defini antes en verifyToken()
    const roles = await Role.find({ _id: { $in: user.roles } });  // De todos los roles, obtengo los que tengan como ID a los que el user tiene como roles.

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Moderator role required." });
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);   // accedo al req.userId que defini antes en verifyToken()
    const roles = await Role.find({ _id: { $in: user.roles } });  // De todos los roles, obtengo los que tengan como ID a los que el user tiene como roles.

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Admin role required." });

}
