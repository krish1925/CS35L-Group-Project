import { useLocation } from 'react-router-dom';
import colorLogo from '../images/fitmatch.png';

function Nav({ setShowModal, showModal, setIsSignUp }) {
  const location = useLocation();
  const authToken = false;

  function handleClick() {
    setShowModal(true);
    setIsSignUp(false);
  }

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={colorLogo} />
      </div>

      {location.pathname !== '/leaderboard' && location.pathname !== '/editProfile' && !authToken && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}>Log In</button>
      )}
    </nav>
  );
}

export default Nav;
