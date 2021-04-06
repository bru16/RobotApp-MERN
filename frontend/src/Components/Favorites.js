import { useAuth } from "../context/authContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";

const Favorites = () => {
    const user = useAuth();
    const handleFavorite = (id, robot, faved) => {
        user.handleFavorite(id, robot, faved);
    }
    return (
        user.favs.length !== 0 ?
            <div>
                {
                    user.favs.map((robot) => {
                        console.log(user.favs);
                        return (<div key={robot._id}>
                            <div className="card col-md-4 mt-5 mx-auto text-white bg-dark" style={{ width: '30rem' }}>
                                <Carousel autoPlay={true} infiniteLoop stopOnHover={true}>
                                    {robot.img.map((url, index) => (
                                        <div key={index}>
                                            <img src={url} className="card-img-top d-block" alt="..." />
                                        </div>
                                    ))}
                                </Carousel>
                                <div className="card-body">
                                    <h5 className="card-title">{robot.name}</h5>
                                    <p className="card-text">{robot.description}</p>
                                    <button className="btn" style={{ color: "darkgoldenrod" }} onClick={() => handleFavorite(robot._id, robot, true)}><FontAwesomeIcon icon={faBackspace} />  DELETE</button>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
            : <div className="container center">
                <h1 style={{ color: "lightgoldenrodyellow" }}>No favorites Robots found, try adding one!</h1>
            </div>
    )

}

export default Favorites;