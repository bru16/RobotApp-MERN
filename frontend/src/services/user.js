import axios from 'axios';

const API = "http://localhost:4000/api";

export const deleteFavorite = async ({ id, token }) => {
    const { data } = await axios.delete(`${API}/user/${id}`, {
        headers: {
            "x-access-token": token
        }
    });
    return data;
}

export const addFavorite = async ({ robot, token }) => {
    const { data } = await axios.put(`${API}/user/`, { robot }, {
        headers: {
            "x-access-token": token
        }
    });
    return data;
}

export const getRobots = async (token) => {
    const { data } = await axios.get(`${API}/user/`, {
        headers: {
            "x-access-token": token
        }
    });
    return data;
}