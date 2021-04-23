import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { useAuth } from '../../context/authContext'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ParticlesBg from 'particles-bg';

const SignupForm = () => {
    const auth = useAuth();
    const history = useHistory();

    const handleSubmit = async (values) => {
        const roles = ['user'];
        if (values.role === 'moderator') roles.push('moderator');
        if (values.role === 'admin') roles.push('moderator', 'admin');

        return auth.register(values.username, values.email, values.password, roles)
            .then(() => {
                toast.success("Signed Up Successfully!");
                history.push("/login");
            }).catch(() => {
                toast.error("User already exists, try again.");
            })
    }

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required')
            .matches(
                /^[aA-zZ]+$/,
                "Username must be only letters"
            )
            .trim(),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
            .trim(),
        confirmPassword: Yup.string()
            .required('Required')
            .test('Passwords match', 'Passwords must match.', function (value) {
                return this.parent.password === value
            }),
        email: Yup.string().email('Invalid email').required('Required').trim(),
        role: Yup.string().trim()
    });

    return (
        <div>
            <div className="mt-5 m-4">
                <Link to="/"><button type="button" className="btn btn-dark" ><FontAwesomeIcon icon={faReply} /> Go back</button></Link>
            </div>
            <div className="container col-md-2 mx-auto mt-5">
                <Formik initialValues={{
                    username: '',
                    password: '',
                    email: '',
                    confirmPassword: '',
                    role: 'user'
                }} onSubmit={values => handleSubmit(values)}
                    validationSchema={SignupSchema}>

                    {({ errors, touched }) => (
                        <Form>
                            <div className="row">
                                <h3>Email</h3>
                                <Field name="email" />
                                {errors.email && touched.email ? <div className="formError">{errors.email}</div> : null}

                                <h3>Username</h3>
                                <Field name="username" />
                                {errors.username && touched.username ? (
                                    <div className="formError">{errors.username}</div>
                                ) : null}

                                <h3>Password</h3>
                                <Field name="password" type="password" />
                                {errors.password && touched.password ? <div className="formError">{errors.password}</div> : null}

                                <h3>Confirm password</h3>
                                <Field name="confirmPassword" type="password" />
                                {errors.confirmPassword && touched.confirmPassword ? <div className="formError">{errors.confirmPassword}</div> : null}

                                <div className="mt-3">
                                    <Field name="role" component="select">
                                        <option value='user'>user</option>
                                        <option value="moderator">moderator</option>
                                        <option value="admin">admin</option>
                                    </Field>
                                </div>
                                <div className="mt-4 text-end">
                                    <button type="submit" className="btn btn btn-dark btn-space" >Submit</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <ParticlesBg type="tadpole" num={10} bg={true} />
        </div>
    )
}

export default SignupForm;