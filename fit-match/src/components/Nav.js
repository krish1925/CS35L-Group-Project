import colorLogo from '../images/fitmatch-logo.png'
import whiteLogo from '../images/fitmatch-logo-white.png'

function Nav({whitePage, setShowModal, showModal, setIsSignUp}) {

    function handleClick() {
        setShowModal(true);
        setIsSignUp(false);
    }

    const authToken = true;

    return (
    
        <nav>
            <div className="logo-container">
                <img className="logo" src={whitePage ? colorLogo : whiteLogo}/>
            </div>

            {!authToken && !whitePage && <button 
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >Log In</button>}
        </nav>
        
    );
}

export default Nav;