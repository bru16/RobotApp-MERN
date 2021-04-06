import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;
    console.log(roles);
    const user = await User.findOne({ $or: [{ email }, { username }] });    // si existe el username o el email pues no es posible crear el usuario.
    if (!user) {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });
        const foundRoles = await Role.find({ name: { $in: roles } });   // devuelve array con objetos 'Role'
        console.log(foundRoles);
        newUser.roles = foundRoles.map((role) => role._id); // asigno al user el ID de los roles.
        /* else {
           const defaultRole = await Role.findOne({ name: "user" });
           newUser.roles.push(defaultRole._id);    // agrego al array el ID del role 'user'
       } */
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json({ message: 'Registro exitoso' });
        return;
    }
    res.status(400).json({ message: 'Ya existe el username/email' });
}

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const matchedPassword = await User.comparePassword(password, userFound.password);  // compare received password and this userFound password stored in the db.
    if (!matchedPassword) return res.status(401).json({ token: null, message: "invalid password" });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: 86400 });

    console.log(userFound);
    res.json({ userFound, token });

}