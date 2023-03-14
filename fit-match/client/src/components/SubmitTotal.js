import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubmitTotal({ setShowModal, isSignUp }) {
  const [total, setTotal] = useState(null)
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate(); // define navigate using useNavigate hook

  function handleClick() {
    setShowModal(false);
    window.location.reload()
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
        
      const response = await axios.post(
        `http://localhost:8000/submitTotal`,
        { total, email } 
      );
      const success = response.status === 201
      setShowModal(false)
      window.location.reload()
  
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className='auth-modal'>
      <div className='close-icon' onClick={handleClick}>
        Ⓧ
      </div>
      <h2>{isSignUp ? 'Submit Total' : 'LOG IN'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='total'
          id='total'
          name='total'
          placeholder='total'
          required={true}
          onChange={(e) => setTotal(e.target.value)}
        />
        <input
          type='email'
          id='total'
          name='total'
          placeholder='email'
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        
        <input className='secondary-button' type='submit' />
        <p>{error}</p>
      </form>

      <hr />
      <h2>Match, Meet, Motivate</h2>
    </div>
  );
}

export default SubmitTotal;
