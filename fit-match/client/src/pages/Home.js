import Nav from '../components/Nav' 
import AuthModal from '../components/AuthModal'
import {useState} from 'react'
import './Home.css';

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
                authToken={authToken}
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
                <h1>Krish</h1>
            <div className="home">
                <h1 className="primary-title">FitMatch</h1>
                <h2 className="tagline" style={{paddingTop: '0px', alignItems: 'top', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
                    <span style={{color:'#007788'}}>Match. </span> 
                    <span style={{color:'#159897'}}>Meet. </span> 
                    <span style={{color:'#21ADA8'}}>Motivate. </span>
                </h2>
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
 