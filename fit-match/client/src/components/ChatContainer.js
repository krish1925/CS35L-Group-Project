import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import {useState} from 'react'


const ChatContainer = ({ user , setMatchSelected, clickedUser, setClickedUser}) => {

    return (
        <div className="chat-container">
            <ChatHeader user={user}/>

            <div>
                <button className="option" onClick={() => {
                    setClickedUser(null)
                    setMatchSelected(null)
                    }}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            {!clickedUser &&<MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} setMatchSelected={setMatchSelected} />}

            {clickedUser && <ChatDisplay user ={user} clickedUser={clickedUser}/>}

        </div>

)}

export default ChatContainer;