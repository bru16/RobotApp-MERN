import { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext'
import { useHistory } from "react-router-dom";
import Loading from './Loading';


const NewRobot = () => {

    const history = useHistory();
    const auth = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isBeingCreated, setIsBeingCreated] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!name.replace(/\s/g, '').length || !description.replace(/\s/g, '').length) {
            toast.error('Name and Description cannot be blank');
            return;
        }
        if (!image) return toast.error('Please put at least ONE Image');
        setIsBeingCreated(true);
        const data = new FormData()
        for (var x = 0; x < image.length; x++) {
            data.append('file', image[x])
        }
        data.append('robot', name);
        data.append('robot', description);
        auth.createRobot(data)
            .then(() => {
                console.log('created')
                toast.info('Robot created successfully');
                history.push('/home');
            })
            .catch(() => {
                setIsBeingCreated(false);
                toast.error('An error has occurred');
            });
    }

    const handleFiles = e => {
        setImage(e.target.files);
    }

    if (isBeingCreated) return <Loading />

    return (
        <div className="container" style={{ width: '500px' }} >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h3>Name</h3>
                    <input type="text" className="form-control" placeholder="Please fill in the information" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <h3>Description</h3>
                    <textarea className="form-control" placeholder="Please fill in the information" onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <h3>Images</h3>
                    <input type="file" name='file' accept="image/*" multiple className="form-control" onChange={handleFiles} />
                </div>
                <button type="submit" className="btn pt-3 pl-5"><h4>Submit</h4></button>
            </form>
        </div>
    )
}

export default NewRobot;