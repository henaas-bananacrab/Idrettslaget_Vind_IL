import { useState } from 'react'
import { matchApi } from '../../services/api'
import Modal from '../common/Modal'

function EditResultModal({ match, onClose, refreshMatches }) {
    const [result, setResult] = useState(match.result || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await matchApi.updateMatchResult(match.match_id, result);

            refreshMatches();
            onClose();
        } catch (error) {
            console.error('Error updating match result:', error);
            alert('Error updating match result. Please check the console for details.');
        }
    };

    return (
        <Modal onClose={onClose}>
            <h2>Edit Match Result</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Result</label>
                    <input
                        type="text"
                        placeholder="Result"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                    />
                </div>
                <button className="button button-primary" type="submit">Save</button>
            </form>
        </Modal>
    );
}

export default EditResultModal;