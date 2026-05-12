import { useState } from 'react';
import { teamApi } from '../../services/api';
import Modal from '../common/Modal';

function AddNewTeam({ onClose, refreshTeams }) {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await teamApi.createTeam(teamName);
            refreshTeams();
            onClose();
        } catch (error) {
            console.error('Error adding team:', error);
            alert('Error adding team. Please check the console for details.');
        }
    };

    return (
        <Modal onClose={onClose}>
            <h2>Create New Team</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Team Name</label>
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>

                <button className="button button-primary" type="submit">Create New Team</button>
            </form>
        </Modal>
    );
}

export default AddNewTeam;