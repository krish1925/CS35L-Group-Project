import axios from 'axios'
import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'

function MatchesDisplay({matches, setClickedUser, setMatchSelected}) {
    const [matchedProfiles, setMatchedProfiles] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userId = cookies.UserId;
    
    const matchedUserIds = matches.map(({user_id}) => user_id)

    const getMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users', {
                params: {userIds: JSON.stringify(matchedUserIds)}
            })
            setMatchedProfiles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredMatchedProfiles = matchedProfiles?.filter(
        matchedProfile => matchedProfile.matches?.filter((profile) => profile.user_id == userId).length > 0)

    useEffect(() => {
        getMatches()
    }, [matches])

    return (
        <div className="matches-display">   
            {filteredMatchedProfiles?.map((match, _index) => (
                <div key = {{_index}} className = "match-card" onClick ={() => {
                    setClickedUser(match)
                    setMatchSelected(match)
                    }}>
                    <div className="img-container">
                        <img src={match?.url} alt ={match?.first_name + ' profile'}/>
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
            ))}
            
        </div>
    )
}

export default MatchesDisplay;
