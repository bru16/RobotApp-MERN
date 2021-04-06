import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import { useAuth } from "../context/authContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import EditModal from './EditModal'

const SingleRobot = ({ token }) => {
    const { id } = useParams(); //get the exact robot to render
    const axios = require('axios').default;
    const user = useAuth();
    const [robot, setRobot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const API = 'http://localhost:4000/api'

    useEffect(() => {
        fetchRobot();
    }, []);

    const isItFaved = user.favs.some(favoriteRobot => favoriteRobot._id === id);
    const isItModerator = user.user.userFound.roles.some(role => role.name === 'moderator');

    const fetchRobot = async () => {    //maybe pass the robot from Robots before fetching?
        setIsLoading(true)
        axios.get(`${API}/products/${id}`, {
            headers: {
                "x-access-token": token
            }
        })
            .then((res) => {
                const robotData = res.data;
                setRobot(robotData)
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }

    const handleFavorite = () => {
        user.handleFavorite(id, robot, isItFaved); // if isItFaved then delete, else add it.
    }

    return (
        isLoading ? <Loading />
            :
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-sm-8 mx-auto mt-5">
                        <ReactPlayer url="https://www.youtube.com/watch?v=JLmOteqmDYc" playing={false} width='100%' height='100%' controls={true} />
                    </div>
                    <div className="card col-md-4 mt-5 mx-auto text-white bg-dark" style={{ width: '30rem' }}>
                        <Carousel autoPlay={true} infiniteLoop stopOnHover={true}>
                            {robot.img.map((url, index) => (
                                <div key={index}>
                                    <img src={url} className="card-img-top d-block" alt="..." />
                                </div>
                            ))}
                        </Carousel>
                        <div className="card-body">
                            <div>
                                <h5 className="card-title">{robot.name}
                                    {isItFaved ? (
                                        <button className='btn' style={{ color: "yellow" }} onClick={handleFavorite}><FontAwesomeIcon icon={faStar} /> Favorite</button>

                                    ) :
                                        <button className='btn' style={{ color: "yellow" }} onClick={handleFavorite}> <FontAwesomeIcon icon={farStar} /> Add to favorite!</button>
                                    }
                                    {isItModerator ? <EditModal {...robot} /> : <div></div>}
                                </h5>
                            </div>
                            <p className="card-text">{robot.description}</p>
                        </div>
                    </div>
                </div >
                <div> </div>
            </div >
    )
}

export default SingleRobot