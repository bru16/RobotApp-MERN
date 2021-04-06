import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Robots from './Robots'
const Home = ({ token }) => {
    const axios = require('axios').default;
    const [robots, setRobots] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const API = 'http://localhost:4000/api'

    useEffect(() => {
        fetchProducts();
        return () => { setRobots({}) }
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true)
        axios.get(`${API}/products/`, {
            headers: {
                "x-access-token": token
            }
        })
            .then((res) => {
                const robotsReceived = res.data;
                setRobots(robotsReceived);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }

    return (
        isLoading ? <Loading /> : <Robots robot={robots} />
    )
}



export default Home;