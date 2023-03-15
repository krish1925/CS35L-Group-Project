import Nav from '../components/Nav' 
import AuthModal from '../components/AuthModal'
import {useState} from 'react'
import './Home.css';

function Tracking(){

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
                <h1 className="primary-title">FitMatch</h1>
                <h2 className="tagline" style={{ color: '#ff4057', paddingTop: '0px', alignItems: 'top', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}> Match, Meet, Motivate </h2>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

            </div>
        </div>
        
    );
}

export default Tracking;
 