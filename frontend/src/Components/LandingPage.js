import { Link } from "react-router-dom";
import ParticlesBg from 'particles-bg';

const LandingPage = ({ user }) => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mx-auto text-center">
                            <h1 className="display-3 animate__animated animate__slideInLeft">Welcome!</h1>
                            <p className="lead">We are a robot company</p>
                            <hr className="my-2" />
                            <p>App built with MERN stack</p>
                            {!user ? <div>
                                <Link to="/login"><button type="button" className="btn btn-sm btn-dark btn-space" >Log In</button></Link>
                                <Link to="/signup"><button type="button" className="btn btn-sm btn-dark" >Sign Up</button></Link>
                            </div> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
            <ParticlesBg type="tadpole" num={10} bg={true} />
        </div>
    );
}

export default LandingPage;