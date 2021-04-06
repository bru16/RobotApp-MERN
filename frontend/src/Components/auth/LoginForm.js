import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useAuth } from '../../context/authContext'


const LoginForm = () => {
    const auth = useAuth();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        auth.login(email, password)
            .then((res) => {
                if (res !== false) {
                    toast.success("Logged In Successfully!");
                    history.push("/home");  // redirect to user's home
                }
                else {
                    toast.error("Email and Password do not match, please try again.");
                }
            });
    }

    return (
        <div>
            <div className="mt-5 m-4">
                <Link to="/"><button type="button" className="btn btn-dark btn-outline-secondary" ><FontAwesomeIcon icon={faReply} /> Go back</button></Link>
            </div>
            <div className="col-md-2 mx-auto mt-5 container">
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
                        <button type="submit" className="btn btn-dark btn-outline-secondary btn-space" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default LoginForm;