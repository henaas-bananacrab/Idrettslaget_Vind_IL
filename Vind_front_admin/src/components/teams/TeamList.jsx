import TeamCard from './TeamCard';

function TeamList({ teams, refreshTeams }) {
    return (
        <div className="grid">
            {teams.map((team) => (
                <TeamCard
                    key={team.team_id}
                    team={team}
                    refreshTeams={refreshTeams}
                />
            ))}
        </div>
    );
}

export default TeamList;