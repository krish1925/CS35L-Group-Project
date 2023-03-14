import colorLogo from '../images/fitmatch.png'

function Nav({/*authToken,*/ whitePage, setShowModal, showModal, setIsSignUp}) {

    function handleClick() {
        setShowModal(true);
        setIsSignUp(false);
    }

    const authToken = false;
    return (
    
        <nav>
            <div className="logo-container">
                <img className="logo" src={whitePage ? colorLogo : colorLogo}/>
            </div>

            {!authToken && !whitePage && (<button 
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >Log In</button>)}
        </nav>
        
    );
}

export default Nav;