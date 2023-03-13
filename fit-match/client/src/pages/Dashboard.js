import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'

function Dashboard() {
  const [user, setUser] = useState(null)
  const[cookies, setCookie, removeCookie] = useCookies(['user'])
  const [genderedUsers, setGenderedUsers] = useState(null)

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
        const response = await axios.get('http://localhost:8000/gendered-user', {
          params: {gender: user?.gender_interest}
        })
        setGenderedUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getUser()
      getGenderedUsers()
    }, [] )


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
  
    const swiped = (direction, swipedUserId) => {
      if (direction === 'right') {
        updatedMatches(swipedUserId.user_id)
      }
      setLastDirection(direction);
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!');
    }

    return (
      <>
      {user &&
        <div className="dashboard">
            <ChatContainer user ={user}/>
            <div className="swipe-container">
                <div className="card-container">
                    
                    {genderedUsers?.map((character) =>
                        <TinderCard 
                            className='swipe' 
                            key={character.first_name} 
                            onSwipe={(dir) => swiped(dir, character.user_id)} 
                            onCardLeftScreen={() => outOfFrame(character.first_name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                                className='card'>
                                <h3>{character.first_name}</h3>
                            </div>
                        </TinderCard>
                    )}

                    <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>
                </div>

            </div>
        </div>} </>
    );
}

export default Dashboard;