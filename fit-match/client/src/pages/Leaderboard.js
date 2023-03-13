import Nav from '../components/Nav' 
import AuthModal from '../components/AuthModal'
import {useState} from 'react'

function Leaderboard(){

    const[showModal, setShowModal] = useState(false);
    const[isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    function handleClick() {
        console.log('clicked');
        setShowModal(true);
        setIsSignUp(true);
    }

    return (
        <div className="overlay">
            <Nav whitePage={false}
                authToken={authToken}
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
            <div className="home">
                <h1 className="primary-title">Leaderboard</h1>
                <button className="primary-button" onClick={handleClick}>
                    {'Submit Total'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

            </div>
        </div>
        
    );
}

export default Leaderboard;
 