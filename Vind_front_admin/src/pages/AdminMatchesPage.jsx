import { useState, useEffect } from 'react'
import { matchApi } from '../services/api'
import MatchList from '../components/matches/MatchList'
import AddNewMatch from '../components/matches/AddNewMatch'

function MatchPage() {
    const [matches, setMatches] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    const fetchMatches = async () => {
        try {
            const response = await matchApi.fetchAllMatches()
            const matchesData = response.data?.data || response.data || [];
            setMatches(Array.isArray(matchesData) ? matchesData : [])
        } catch (error) {
            console.error('Error fetching matches:', error)
            setMatches([])
        }
    }

    useEffect(() => {
        fetchMatches()
    }, [])

    return (
        <div className="page">
            <div className="header-row">
                <div>
                    <h1>Kamper</h1>
                    <p className="page-description">
                        Registrer kampoppsett og oppdater resultater for å holde turneringen organisert.
                    </p>
                </div>

                <button className="button button-primary" onClick={() => setShowCreate(true)}>
                    Opprett Ny Kamp
                </button>
            </div>

            <MatchList matches={matches} refreshMatches={fetchMatches} />

            {showCreate && (
                <AddNewMatch onClose={() => setShowCreate(false)} refreshMatches={fetchMatches} />
            )}
        </div>
    );
}

export default MatchPage;