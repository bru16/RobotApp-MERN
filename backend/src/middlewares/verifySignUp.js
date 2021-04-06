import { ROLES } from '../models/Role'

export const checkRolesExisting = async (req, res, next) => {
    const userRoles = req.body.roles
    if (userRoles) {
        for (let i = 0; i < userRoles.length; i++) {
            if (!ROLES.includes(userRoles[i])); {
                return res.status(400).json({ message: `Role ${userRoles[i]} does not exist` });
            }
        }
    }
    next();
}