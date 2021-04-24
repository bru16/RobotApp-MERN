import { useAuth } from "../context/authContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faRobot } from "@fortawesome/free-solid-svg-icons";

const Favorites = () => {
    const user = useAuth();
    return (
        user.favs.length !== 0 ?
            <div className="container">
                {
                    user.favs.map((robot) => {
                        return (
                            <div key={robot._id}>
                                <div className="card mb-3 col-md-4 mx-auto text-white bg-dark" >
                                    <Carousel
                                        autoPlay
                                        infiniteLoop
                                        stopOnHover
                                        renderThumbs={() => { return robot.img.map((url, index) => { return <img key={index} src={url} /> }) }}
                                    >
                                        {robot.img.map((url, index) => (
                                            <div key={index}>
                                                <img src={url} alt="robotImages" />
                                            </div>
                                        ))}
                                    </Carousel>
                                    <div className="card-body text-center">
                                        <h5 className="card-title" style={{ color: "yellowgreen" }}><FontAwesomeIcon icon={faRobot} color="orange" /> {robot.name}</h5>
                                        <p className="card-text">{robot.description}</p>
                                        <button className="btn" style={{ color: "darkgoldenrod" }} onClick={() => user.handleFavorite(robot._id, robot, true)}><FontAwesomeIcon icon={faBackspace} />  DELETE</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            : <div className="container center">
                <h1 style={{ color: "lightgoldenrodyellow" }}>No favorites Robots found, try adding one!</h1>
            </div>
    )
}

export default Favorites;