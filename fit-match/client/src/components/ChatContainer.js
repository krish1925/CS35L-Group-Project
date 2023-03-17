import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import { useState, useEffect } from 'react'

const ChatContainer = ({ user, setMatchSelected, clickedUser, setClickedUser }) => {
    const [refreshChat, setRefreshChat] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshChat(prevState => !prevState);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="chat-container">
            <ChatHeader user={user} />

            <div>
                <button className="option" onClick={() => {
                    setClickedUser(null)
                    setMatchSelected(null)
                }}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} setMatchSelected={setMatchSelected} />}
            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} refreshChat={refreshChat} />}
        </div>
    )
}

export default ChatContainer;
