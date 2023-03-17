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
      if  (response.status === 404) {
        setError('Invalid Email')
      }

      setShowModal(false)
      window.location.reload()
  
    } catch (error) {
      console.log(error);
      setError('Invalid Email')
    }
  };
  

  return (
    <div className='auth-modal'>
      <div className='close-icon' onClick={handleClick}>
      ✖
      </div>
      {isSignUp ? (
          <div>
          <span style={{ color: "#007788", fontWeight: "bold", fontSize: "20px" }}>SUBMIT </span>
          <span style={{ color: "#159897", fontWeight: "bold", fontSize: "20px" }}>TOTAL</span>
          </div>
        ) : (
          <div>
          <span style={{ color: "#007788" }}>LOG </span>
          <span style={{ color: "#159897" }}>IN </span>
        </div>
        )}

      <form onSubmit={handleSubmit}>
        <input
          type='number'
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
      <h2 className='tagline' style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
        <span style={{ color: '#007788' }}>Match. </span>
        <span style={{ color: '#159897' }}>Meet. </span>
        <span style={{ color: '#21ADA8' }}>Motivate. </span>
      </h2>
    </div>
  );
}

export default SubmitTotal;
