import MatchCard from './MatchCard';

function MatchList({ matches, refreshMatches }) {
    return (
        <div className="grid">
            {matches.map((match) => (
                <MatchCard
                    key={match.match_id}
                    match={match}
                    refreshMatches={refreshMatches}
                />
            ))}
        </div>
    );
}

export default MatchList;