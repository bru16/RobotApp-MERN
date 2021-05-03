import axios from 'axios';

const API = "http://localhost:4000/api";

export const deleteRobot = async ({ robot, token }) => {
    const { data } = await axios.delete(`${API}/products/${robot._id}`, {
        headers: {
            "x-access-token": token
        }
    });
    return data;
}

export const createRobot = async ({ robot, token }) => {
    const { data } = await axios.post(`${API}/products/new`, robot, {
        headers: {
            "x-access-token": token
        }
    });
    return data;
}

export const editRobot = async ({ robotName, robotDescription, token, _id }) => {
    const { data } = await axios.put(`${API}/products/${_id}`, { robotName, robotDescription }, {
        headers: {
            "x-access-token": token
        }
    });
    return data;
}