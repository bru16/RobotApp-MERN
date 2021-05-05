import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faStar } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const { user, logout } = useAuth();
    const isItAdmin = user.userFound.roles.some(roles => roles.name === 'admin');
    return (
        user ? <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="nav-link" to="/home"><h4>RobApp</h4></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" data-test-id="favoriteRobotsUser" aria-current="page" to="/favorite"><FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} /> My Favorites</Link>
                        </li>
                        {isItAdmin ? <li className="nav-item">
                            <Link className="nav-link" to="/new"><FontAwesomeIcon icon={faPlusSquare} style={{ color: "green" }} /> Add a robot!</Link>
                        </li> : <div></div>}

                    </ul>
                </div>
                <Link to="/"><button type="button" className="btn btn-dark btn-space" onClick={logout}>Log Out</button></Link>
            </div>

        </nav> :
            <div> </div>
    );
}

export default Navbar;