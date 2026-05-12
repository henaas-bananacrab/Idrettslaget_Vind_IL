import { useState } from 'react'
import { matchApi } from '../../services/api'
import Modal from '../common/Modal'

function AddNewMatch({ onClose, refreshMatches }) {
    const [formData, setFormData] = useState({
        team_id_1: '',
        team_id_2: '',
        time: '',
        result: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await matchApi.createMatch(formData);
            refreshMatches();
            onClose();
        } catch (error) {
            console.error('Error adding match:', error);
            alert('Error adding match. Please check the console for details.');
        }
    };

    return (
        <Modal onClose={onClose}>
            <h2>Create New Match</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Team ID 1</label>
                    <input
                        type="number"
                        placeholder="Team ID 1"
                        value={formData.team_id_1}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                team_id_1: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Team ID 2</label>
                    <input
                        type="number"
                        placeholder="Team ID 2"
                        value={formData.team_id_2}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                team_id_2: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Match Time</label>
                    <input
                        type="datetime-local"
                        value={formData.time}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                time: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Result (optional)</label>
                    <input
                        type="text"
                        placeholder="Result (leave blank if pending)"
                        value={formData.result}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                result: e.target.value
                            })
                        }
                    />
                </div>
                <button className="button button-primary" type="submit">
                    Create Match
                </button>
            </form>
        </Modal>
    );
}

export default AddNewMatch;