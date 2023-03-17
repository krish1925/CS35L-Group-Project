import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthModal({ setShowModal, isSignUp }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const location = useLocation(); // get current page using useLocation hook

  function handleClick() {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError('Passwords need to match!');
      }
      
      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? 'signup' : 'login'}`,
        { email, password }
      );
      
      
      setTimeout(function() {
      }, 1000);
      setCookie('AuthToken', response.data.token, { path: '/' });
      setCookie('UserId', response.data.userId, { path: '/' })

      const success = response.status === 201;

      if (success && isSignUp)    {  setTimeout(function() {
      }, 2000); navigate('/onboarding');}
      if (success && !isSignUp)  {    setTimeout(function() {
      }, 2000); navigate('/dashboard');}
      if(!success) {
        setError("Account creation failed. Email may be taken.")
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Conditionally render AuthModal based on the current page
  if (location.pathname === '/leaderboard') {
    return null; // Return null to hide the login option on the leaderboard page
  }

  return (
    <div className='auth-modal'>
      <div className='close-icon' onClick={handleClick}>
        ✖
      </div>
      <h2 style={{ display: "inline-block" }}>
        {isSignUp ? (
          <div>
          <span style={{ color: "#007788" }}>CREATE </span>
          <span style={{ color: "#159897" }}>ACCOUNT</span>
          </div>
        ) : (
          <div>
          <span style={{ color: "#007788" }}>LOG </span>
          <span style={{ color: "#159897" }}>IN </span>
        </div>
        )}
      </h2>


      <form onSubmit={handleSubmit}>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='email'
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type='password'
            id='password-check'
            name='password-check'
            placeholder='confirm password'
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className='secondary-button' type='submit' />
        <p>{error}</p>
      </form>

      <hr />
      <h2 className='tagline' style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
        <span style={{ color: '#007788' }}>Match. </span>
        <span style={{ color: '#159897' }}>Meet. </span>
        <span style={{ color: '#21ADA8' }}>Motivate. </span>
      </h2>
    </div>
  );
}

export default AuthModal;
