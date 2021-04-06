import Modal from 'react-modal';
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../context/authContext'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const EditModal = ({ name, _id, description }) => {
    const history = useHistory();
    const user = useAuth();
    const customStyles = {
        overlay:
        {
            backgroundColor: null
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: '60%',
            bottom: '0',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#544848'
        }
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    const [robotName, setName] = useState('');
    const [robotDescription, setRobotDescription] = useState('');

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const submitEdit = e => {
        console.log(_id)
        e.preventDefault();
        if (!robotName.replace(/\s/g, '').length || !robotDescription.replace(/\s/g, '').length) {
            toast.error('Name and Description cannot be blank');
            return;
        }
        user.editRobot({ robotName, robotDescription, _id })
            .then(() => {
                user.getFavs(); // update favorite robots array in user. (context)
                history.push('/home')
                toast.info("Edited Successfully!")
            })
            .catch(() => toast.error('An error has ocurred'));
    }

    return (
        <div>
            <button className="btn" onClick={openModal} style={{ color: 'lightskyblue' }}><FontAwesomeIcon icon={faEdit} />  EDIT</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Modal"
            >
                <div className="modal-header">
                    <h2>EDIT {name}</h2>
                    <button className="btn" style={{ color: 'snow' }} onClick={closeModal}><FontAwesomeIcon icon={faWindowClose} /></button>
                </div>
                <div>
                    <form onSubmit={submitEdit}>
                        <div className="mt-3 form-group">
                            <h2>Name</h2>
                            <input type="text" className="form-control" placeholder="Please fill in the information" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mt-4 form-group">
                            <h2>robotDescription</h2>
                            <textarea class="form-control" placeholder="Please fill in the information" onChange={e => setRobotDescription(e.target.value)} ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-dark btn-outline-secondary btn-space"><FontAwesomeIcon icon={faPaperPlane} /> Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default EditModal;