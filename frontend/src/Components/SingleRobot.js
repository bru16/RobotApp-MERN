import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
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
    const userSession = useAuth();
    const [robot, setRobot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const API = 'http://localhost:4000/api'

    useEffect(() => {
        fetchRobot();
    }, []);

    const isItFaved = userSession.favs.some(favoriteRobot => favoriteRobot._id === id);
    const isItModerator = userSession.user.userFound.roles.some(role => role.name === 'moderator');

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
        userSession.handleFavorite(id, robot, isItFaved); // if isItFaved then delete, else add it.
    }

    return (
        isLoading ? <Loading />
            :
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-sm-8 mx-auto mt-5">
                        <ReactPlayer url={robot.video} playing width='100%' height='100%' controls />
                    </div>
                    <div className="card col-md-4 mt-5 mx-auto text-white bg-dark" style={{ width: '30rem' }}>
                        <Carousel
                            autoPlay
                            infiniteLoop
                            renderThumbs={() => { return robot.img.map((url, index) => { return <img key={index} src={url} /> }) }}
                            stopOnHover
                            showIndicators={false}>
                            {robot.img.map((url, index) => (
                                <img key={index} src={url} className="photo card-img-top d-block" alt="..." />
                            ))}
                        </Carousel>
                        <div className="card-body">
                            <h5 className="card-title">{robot.name}
                                {isItFaved ? (
                                    <button className='btn' style={{ color: "yellow" }} onClick={handleFavorite}><FontAwesomeIcon icon={faStar} /> Favorite</button>

                                ) :
                                    <button className='btn' style={{ color: "yellow" }} onClick={handleFavorite}> <FontAwesomeIcon icon={farStar} /> Add to favorite!</button>
                                }
                            </h5>
                            <p className="card-text">{robot.description}</p>
                        </div>
                        <div className="mb-3 mx-auto">
                            {isItModerator ? <EditModal {...robot} /> : <div></div>}
                        </div>
                    </div>
                </div >
                <div> </div>
            </div >
    )
}

export default SingleRobot