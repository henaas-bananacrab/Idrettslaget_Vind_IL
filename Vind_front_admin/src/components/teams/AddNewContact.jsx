import { useState } from 'react';
import { contactApi } from '../../services/api';
import Modal from '../common/Modal';

function AddNewContact({ teamId, onClose, refreshContacts }) {
    const [contactName, setContactName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await contactApi.createContact(contactName, contactNumber, teamId);
            refreshContacts();
            onClose();
        } catch (error) {
            console.error('Error adding contact:', error);
            alert('Error adding contact. Please check the console for details.');
        }
    };

    return (
        <Modal onClose={onClose}>
            <h2>Create New Contact</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Contact Name</label>
                    <input
                        type="text"
                        placeholder="Contact Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>

                <button className="button button-primary" type="submit">Create New Contact</button>
            </form>
        </Modal>
    );
}

export default AddNewContact;