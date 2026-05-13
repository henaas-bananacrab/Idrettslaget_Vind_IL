import { useState, useEffect, useRef } from 'react'
import { matchApi } from '../services/api'
import MatchList from '../components/matches/MatchList'
import AddNewMatch from '../components/matches/AddNewMatch'

function MatchPage() {
    const [matches, setMatches] = useState([])
    const [showCreate, setShowCreate] = useState(false)

    const alertedRef = useRef(false)

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

    const fetchUpcomingMatches = async () => {
        try {
            const response = await matchApi.fetchUpcomingMatches()
            const matchesData = response.data?.data || response.data || []
            const upcomingMatches = Array.isArray(matchesData) ? matchesData : []

            if (upcomingMatches.length > 0 && !alertedRef.current) {
                alertedRef.current = true

                const matchList = upcomingMatches.map(match => {
                    const matchTime = new Date(match.time).toLocaleString('no-NO', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    return `- ${match.team_name_1} vs ${match.team_name_2} on ${matchTime}`
                }).join('\n')
                alert(`Upcoming matches found:\n${matchList}`)
            }

            console.log('Fetched upcoming matches:', upcomingMatches)
            return upcomingMatches
        } catch (error) {
            console.error('Error fetching upcoming matches:', error)
            return []
        }
    }

    useEffect(() => {
        fetchMatches()
        fetchUpcomingMatches()
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