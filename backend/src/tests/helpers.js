import app from '../app';
import supertest from 'supertest';
import FormData from 'form-data'
export const api = supertest(app);

export const initialRobots = [
    {
        name: 'R2D2',
        description: 'This is a test for R2D2',
        img: ['imgURLr2d2'],
        video: 'http:kdsaad'
    },
    {
        name: 'C3P0',
        description: 'This is a test for C3P0',
        img: ['imgURL2'],
        video: 'adasdsaads'
    },
    {
        name: 'C3P0',
        description: 'This is a test for C3P0',
        img: ['imgURL2'],
        video: 'adasdsaads'
    }
]

export const newRobot = {
    name: 'test123',
    description: 'This is a test',
    img: ['test'],
    video: 'test'
}

export const getRobots = async ({ token }) => {
    const response = await api.get('/api/products').set("x-access-token", token);
    return response;
}
