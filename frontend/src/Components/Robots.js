import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Robots = ({ robot }) => {
    return (
        <div className="mt-4 container-fluid row row-cols-1 row-cols-md-3 g-4">
            {robot.map((r) => (
                <div key={r._id}>
                    <div className="d-flex col">
                        <div className="card mx-auto text-white bg-dark" style={{ width: '30rem' }}>
                            <Carousel autoPlay={true} infiniteLoop stopOnHover={true}>
                                {r.img.map((url, index) => (
                                    <img key={index} src={url} className="card-img-top d-block" alt="..." />
                                ))}
                            </Carousel>
                            <div className="card-body">
                                <h5 className="card-title">{r.name}</h5>
                                <p className="card-text">{r.description}</p>
                                <Link to={`robot/${r._id}`}><button type="button" className="btn btn-dark btn-outline-secondary" >More Info    <FontAwesomeIcon icon={faInfoCircle} /></button></Link>
                            </div>
                        </div>
                    </div >
                </div>
            ))}
        </div>
    )
}

export default Robots;