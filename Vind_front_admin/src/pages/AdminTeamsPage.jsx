import { useState, useEffect } from 'react';
import { teamApi } from '../services/api';
import TeamList from '../components/teams/TeamList';
import AddNewTeam from '../components/teams/AddNewTeam';

function TeamPage() {
    const [teams, setTeams] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    const fetchTeams = async () => {
        try {
            const response = await teamApi.getAllTeams()
            const teamsData = response.data?.data || response.data || [];
            setTeams(Array.isArray(teamsData) ? teamsData : [])
        } catch (error) {
            console.error('Error fetching teams:', error)
            setTeams([])
        }
    }

    useEffect(() => {
        fetchTeams()
    }, [])

    return (
        <div className="page">
            <div className="header-row">
                <div>
                    <h1>Lag</h1>
                    <p className="page-description">
                        Administrer lag og spillerinformasjon for å støtte turneringsadministrasjon.
                    </p>
                </div>

                <button className="button button-primary" onClick={() => setShowCreate(true)}>
                    Opprett Nytt Lag
                </button>
            </div>

            <TeamList teams={teams} refreshTeams={fetchTeams} />

            {showCreate && (
                <AddNewTeam onClose={() => setShowCreate(false)} refreshTeams={fetchTeams} />
            )}
        </div>
    );
}

export default TeamPage;