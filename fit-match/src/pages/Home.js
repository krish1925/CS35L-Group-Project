import Nav from '../components/Nav' 
import AuthModal from '../components/AuthModal'
import {useState} from 'react'

function Home(){

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
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
            <div className="home">
                <h1 className="primary-title">FitMatch</h1>
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

export default Home;
 