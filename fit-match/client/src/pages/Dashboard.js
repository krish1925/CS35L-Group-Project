import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import ViewProfile from './Viewprofile'
import Leaderboard from './Leaderboard'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null)
  const[cookies, setCookie, removeCookie] = useCookies(['user'])
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

    const userId = cookies.UserId

    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          params: {userId}
        })
        setUser(response.data)
      } catch(error) {
        console.log(error)
      }
    }
    //modify for selection by workout pref
    const getGenderedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/gendered-users', {
          params: {gender: user?.gender_interest}
        })
        setGenderedUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getUser()
    }, [] )

    //added this here
    useEffect(() => {
      if (user) {
        getGenderedUsers()
      }
    }, [user] )


    const [lastDirection, setLastDirection] = useState();

    const updatedMatches = async (matchedUserId) => {
      try {
        await axios.put('http://localhost:8000/addmatch', {
          userId,
          matchedUserId
        })
        getUser()
      } catch (error) {
        console.log(error)
      }
    }
  
    console.log(user)
    const swiped = (direction, swipedUserId) => {
      if (direction === 'right') {
        console.log(swipedUserId)
        updatedMatches(swipedUserId)
      }
      setLastDirection(direction);
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!');
    }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)
    const filteredGenderedUsers = genderedUsers?.filter(
      genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )
    const goLeaderboard = () => {
      navigate('/leaderboard');
    };
    const goViewprofile = () => {
      navigate('/viewprofile', { state: { user } });
    }

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          
          <div className="swipe-container">
          <div className="button-container">
                <button className="secondary-button" onClick={goLeaderboard}>Leaderboard</button>
                <button className="secondary-button" onClick={goViewprofile}>View/Edit Profile</button>
              </div>
            <div className="card-container">

              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.first_name}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                    className="card"
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div> 
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
  

export default Dashboard;