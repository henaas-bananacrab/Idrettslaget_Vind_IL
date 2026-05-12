import { useState } from 'react';
import { playerApi } from '../../services/api';
import Modal from '../common/Modal';

function AddNewPlayer({ teamId, onClose, refreshPlayers }) {
    const [playerName, setPlayerName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await playerApi.createPlayer(playerName, teamId);
            refreshPlayers();
            onClose();
        } catch (error) {
            console.error('Error adding player:', error);
            alert('Error adding player. Please check the console for details.');
        }
    };

    return (
        <Modal onClose={onClose}>
            <h2>Create New Player</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Player Name</label>
                    <input
                        type="text"
                        placeholder="Player Name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>

                <button className="button button-primary" type="submit">Create New Player</button>
            </form>
        </Modal>
    );
}

export default AddNewPlayer;