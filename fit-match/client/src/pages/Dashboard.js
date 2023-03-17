import TinderCard from 'react-tinder-card'
import React from 'react'
import {useEffect, useState, useRef} from 'react'
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
  const [matchSelected, setMatchSelected] = useState(null)
  const[clickedUser, setClickedUser] = useState(null)
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
    const tinderCardRef = useRef(null);

    const tinderCardLeftRef = useRef(null);
    const tinderCardRightRef = useRef(null);
    
    const swipeLeft = () => {
      tinderCardLeftRef.current?.swipe("left");
    };
    
    const swipeRight = () => {
      tinderCardRightRef.current?.swipe("right");
    };

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
      genderedUser => {
        // Exclude users already matched
        if (matchedUserIds.includes(genderedUser.user_id)) {
          return false;
        }
        if (genderedUser.goals == undefined) {return false;}
        console.log(user.gender_interest)
        // Check user's preferred gender
        if (user.gender_interest === 'Everyone') {
          console.log("a")
          return true;
          
        }
        if (user.gender_interest === 'Male' && genderedUser.gender_identity !== 'Male') {
          return false;
        }
        if (user.gender_interest === 'Female' && genderedUser.gender_identity !== 'Female') {
          return false;
        }

        // Include users that passed all the conditions
        return true;
      
      }
    );
    
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
          <ChatContainer user={user} setMatchSelected={setMatchSelected} clickedUser = {clickedUser}setClickedUser={setClickedUser} />
          
          <div className="swipe-container">
          <div className="button-container">
                <button className="secondary-button" onClick={goLeaderboard}>Leaderboard</button>
                <button className="secondary-button" onClick={goViewprofile}>View/Edit My Profile</button>
              </div>
           {!matchSelected &&( <div className="card-container">

              {filteredGenderedUsers?.map((genderedUser, index) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.first_name}
                  preventSwipe={["up", "down"]}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                  ref={index % 2 === 0 ? tinderCardLeftRef : tinderCardRightRef}
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

                <button className="swipe-button" onClick={swipeLeft}>Left</button>
                <button className="swipe-button" onClick={swipeRight}>Right</button>

              </div>
              
            </div>)}
            {matchSelected && 
            (<div className="ViewProfile">

      
            <h2>{matchSelected.first_name}</h2>
            <img src={matchSelected.url} alt={"photo"} style={{maxWidth: "300px", maxgitHeight: "300px"}}/>
            <p>Gender: {matchSelected.gender_identity}</p>
            <p>Gender Interest: {matchSelected.gender_interest}</p>
            <p>About me: {matchSelected.about}</p>
            <p>Goals: {matchSelected.goals}</p>
            <p>Favorite Exercise: {matchSelected.favorite_exercise}</p>
            <p>Preferred Workout Time: {matchSelected.workout_time}</p>
            <p>Preferred Workout Intensity: {matchSelected.workout_intensity}</p>
            
          </div>)}
          </div>
        </div>
      )}
    </>
  )
}
  

export default Dashboard;