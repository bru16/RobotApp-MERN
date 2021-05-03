import React, { useState, useContext, createContext, useEffect, } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'
import * as robotService from '../services/robots'
import * as userService from '../services/user'

const authContext = createContext();
const API_URL = "http://localhost:4000/api/";

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [favs, setFavs] = useState([]);
    const [timeToLogOut, setTimeToLogOut] = useState(null);
    const history = useHistory();
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
            toast.success("Logged In Successfully!");
            history.push("/home");  // redirect to user's home
        }).catch(() => {
            toast.error("Email and Password do not match, please try again.");
        })
    };

    const register = async (username, email, password, roles) => {
        return axios.post(API_URL + "auth/signup", {
            username,
            email,
            password,
            roles
        }).then(() => {
            toast.success("Signed Up Successfully!");
            history.push("/login");
        }).catch(() => {
            toast.error("User already exists, try again.");
        })
    };

    const logout = () => {
        localStorage.clear();
        clearTimeout(timeToLogOut);
        setUser(null);
        setTimeToLogOut(null);
    };

    const autoLogout = (miliseconds) => {
        const time = setTimeout(() => { logout() }, miliseconds);   // id of the timeout
        setTimeToLogOut(time);
    }

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };

    const getFavs = async () => {
        const token = user.token;
        try {
            const data = await userService.getRobots(token);
            setFavs(data);
        } catch (error) {
            toast.error('An error has occurred');
        }
    }

    const deleteFavorite = async (id) => {
        try {
            const token = user.token;
            const data = await userService.deleteFavorite({ id, token });
            setFavs(data.favoriteRobots);
        } catch (error) {
            toast.error("An error has occurred");
        }
    }

    const handleFavorite = async ({ id, robot, isItFaved }) => {
        const token = user.token;
        console.log(robot)
        if (isItFaved === true) {
            try {
                const data = await userService.deleteFavorite({ id, token });
                setFavs(data.favoriteRobots);
            } catch (error) {
                toast.error('An error has occurred');
            }
        }
        else {
            try {
                const data = await userService.addFavorite({ robot, token });
                setFavs(data.favoriteRobots);
            } catch (error) {
                toast.error('An error has occurred');
            }
        }
    }

    const editRobot = async ({ robotName, robotDescription, _id }) => {
        try {
            const token = user.token;
            await robotService.editRobot({ robotName, robotDescription, token, _id });
            getFavs();
            history.push("/home");
            toast.info("Robot edited successfully!");
        } catch (error) {
            toast.error('An error has occurred')
        }
    }

    const createRobot = async (robot) => {
        try {
            const token = user.token;
            await robotService.createRobot({ robot, token });
            toast.info('Robot created successfully!');
            history.push("/home");
        } catch (error) {
            toast.error('An error has occurred');
        }
    }

    const deleteRobot = async (robot) => {
        try {
            const token = user.token;
            await robotService.deleteRobot({ robot, token });
            getFavs();
            toast.info("Robot deleted successfully!");
            history.push('/home');
        } catch (error) {
            toast.error("An error has occurred");
        }
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
        createRobot,
        deleteRobot,
        deleteFavorite
    };
}

export function ProvideAuth({ children }) { // provider propio, creo la "clase" y se las proveo a la app
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);   // usa el contexto creado, y como tiene provider utiliza el value, entonces simplemente llamo a useAuth.

export default authContext;