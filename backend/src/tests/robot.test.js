import { api, initialRobots, newRobot, getRobots } from './helpers'
import Product from '../models/Product'
import { server } from '../index'
import mongoose from 'mongoose'

let token;
let robotId = [];

beforeAll(async (done) => {  // create robots in the test-db
    await Product.deleteMany({}); //ensure that the database is in the same state before every test is run
    for (const robot of initialRobots) {
        const newRobot = new Product(robot);
        robotId.push((await newRobot.save())._id);
    }
    const response = await api.post('/api/auth/signin').send({ email: "admin@admin.com", password: "admin123" });
    token = response.body.token;
    done();
});

// GET products endpoint
describe('GET /api/products', () => {
    test('get robots (jwt)', async () => {
        const { body, statusCode } = await getRobots({ token });
        expect(body).toHaveLength(initialRobots.length)
        expect(statusCode).toBe(200);
    });

    test('get a robot with :id (jwt)', async () => {
        const { body, statusCode } = await api.get(`/api/products/${robotId[0]}`).set("x-access-token", token);
        expect(body.name).toBe('R2D2')
        expect(body.description).toBe('This is a test for R2D2')
        expect(body.img).toContain('imgURLr2d2')
        expect(statusCode).toBe(200);
    });

    test('Get robots after creating a new one (jwt)', async () => {
        await new Product(newRobot).save();
        const { body, statusCode } = await getRobots({ token });
        expect(body).toHaveLength(initialRobots.length + 1)
        expect(statusCode).toBe(200);
    });

    test('Get robots after deleting all of them (jwt)', async () => {
        await Product.deleteMany({});
        const { body, statusCode } = await getRobots({ token });
        expect(body).toHaveLength(0)
        expect(statusCode).toBe(200);
    });

    test('Trying to get the robots without a header token', async () => {
        const { body, statusCode } = await api.get('/api/products')
        expect(body.message).toBe('No token provided')
        expect(statusCode).toBe(403)
    });

    test('Trying to get the robots with token = null', async () => {
        const { body, statusCode } = await api.get('/api/products').set("x-access-token", null);
        expect(body.message).toBe('Unauthorized')
        expect(statusCode).toBe(500)
    });
})

/* describe('POST /api/products/new', () => {
    test('Creating a robot (ADMIN ROLE)', async () => {
        const { body, statusCode } = await api.post('/api/products/new').send(newRobot).set("x-access-token", token);
        console.log(body)
        expect(statusCode).toBe(200)
    })
})
*/
afterAll(() => {
    server.close();
    mongoose.connection.close();
})
