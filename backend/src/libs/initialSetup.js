import Role from '../models/Role';
//metodo para crear roles al inicio del servidor si es que no existen. Deben existir roles por default.
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count != 0) return;

        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ]);
        console.log(values);
    } catch (error) {
        console.log(error);
    }
};