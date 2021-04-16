import { Link } from "react-router-dom";

const LandingPage = ({ user }) => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3 animate__animated animate__slideInLeft">Welcome!</h1>
                    <p className="lead">We are a robot company</p>
                    <hr className="my-2" />
                    <p>App built with MERN stack</p>
                    {!user ? <div className='btn-rightEnd'>
                        <Link to="/login"><button type="button" className="btn btn-dark btn-outline-secondary btn-space" >Log In</button></Link>
                        <Link to="/signup"><button type="button" className="btn btn-dark btn-outline-secondary" >Sign Up</button></Link>
                    </div> : <div></div>}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;