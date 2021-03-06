import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useAuth } from '../../context/authContext'
import ParticlesBg from 'particles-bg';

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    return (
        <div>
            <div className="mt-5 m-4">
                <Link to="/"><button type="button" className="btn btn-dark" ><FontAwesomeIcon icon={faReply} /> Go back</button></Link>
            </div>
            <div className="container col-md-3 mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h3>Email</h3>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <h3>Password</h3>
                        <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <small className="form-text text-muted">We'll never share your password with anyone else.</small>
                    </div>
                    <div className="mt-2 ">
                        <button type="submit" className="btn btn-sm btn-dark btn-space" >Submit</button>
                    </div>
                </form>
            </div>
            <ParticlesBg type="tadpole" num={10} bg={true} />
        </div>
    )

}

export default LoginForm;