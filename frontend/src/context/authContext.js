import React, { useState, useContext, createContext, useEffect, } from 'react';

const authContext = createContext();
const API_URL = "http://localhost:4000/api/";
const axios = require('axios').default;

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [favs, setFavs] = useState([]);
    const [token, setToken] = useState(null);
    const [timeToLogOut, setTimeToLogOut] = useState(null);

    useEffect(() => {
        const loggedInUser = getCurrentUser()
        if (loggedInUser) {
            const foundUser = loggedInUser;
            setUser(foundUser); // Persistent data
        }
    }, []);

    useEffect(() => {
        if (user) {
            getFavs();
            setToken(user.token);
        }
    }, [user])

    const login = async (email, password) => {
        return axios.post(API_URL + "auth/signin", {
            email,
            password,
        }).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data)); // save user and its token
            setUser(res.data);
            const expiryDate = Date.now() + 7200000; //2 hrs
            localStorage.setItem('expiryDate', JSON.stringify(expiryDate));
            autoLogout(7200000);
        }).catch(() => {
            return false
        })
    };

    const register = async (username, email, password, roles) => {
        return axios.post(API_URL + "auth/signup", {
            username,
            email,
            password,
            roles
        });
    };

    const logout = () => {
        localStorage.clear();
        clearTimeout(timeToLogOut);
        setUser(null);
        setToken(null);
        setTimeToLogOut(null);
    };

    const autoLogout = (miliseconds) => {
        const time = setTimeout(() => { logout() }, miliseconds);   // id of the timeout
        setTimeToLogOut(time);
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };

    const getFavs = () => {
        axios.get(`${API_URL}user/`, {
            headers: {
                "x-access-token": user.token
            }
        }).then((res) => {
            setFavs(res.data);
        });
    }

    const handleFavorite = (id, robot, isFaved) => {
        if (isFaved === true) {
            axios.delete(`${API_URL}user/${id}`, {
                headers: {
                    "x-access-token": token
                }
            }).then((res) => {
                setFavs(res.data.favoriteRobots);
            }).catch((err) => console.log(err))
        }
        else (
            axios.put(`${API_URL}user/${id}`, { robot }, {
                headers: {
                    "x-access-token": token
                }
            }).then((res) => {
                setFavs(res.data.favoriteRobots);
            })
        )
    }

    const editRobot = ({ robotName, robotDescription, _id }) => {
        return axios.put(`${API_URL}products/${_id}`, { robotName, robotDescription, _id }, {
            headers: {
                "x-access-token": token,
            },
        }).catch(err => console.log(err));
    }

    async function createRobot(data) {
        axios.post(`${API_URL}products/new`, data, {
            headers: {
                "x-access-token": token
            },
        })
            .then((res) => console.log(res))
            .catch(err => console.log(err));
    }

    // Return the user object and auth methods
    return {
        favs,
        setFavs,
        user,
        setUser,
        login,
        register,
        logout,
        getCurrentUser,
        handleFavorite,
        editRobot,
        getFavs,
        createRobot
    };
}

export function ProvideAuth({ children }) { // provider propio, creo la "clase" y se las proveo a la app
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);   // usa el contexto creado, y como tiene provider utiliza el value, entonces simplemente llamo a useAuth.

export default authContext;