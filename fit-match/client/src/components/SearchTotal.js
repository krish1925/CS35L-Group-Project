import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchTotal({ setShowSearch, searchResult, setSearchResult}) {
  const [total, setTotal] = useState(null)
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate(); // define navigate using useNavigate hook

  function handleClick() {
    setShowSearch(false);
    window.location.reload()
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
        const response = await axios.get('http://localhost:8000/searchTotal', {
          params: {email}
        })
      if (response.data == 'error'){
        setError('Invalid Email')
        return
      }
      setShowSearch(false)
      setSearchResult(response.data)
      console.log(searchResult)
  
    } catch (error) {
      console.log(error);
    } 
    
  };
  

  return (
    <div className='auth-modal'>
      <div className='close-icon' onClick={handleClick}>
      ✖
      </div>
      <h2 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', fontWeight: "bold", fontSize: "20px" }}>
        <span style={{ color: '#007788' }}>SEARCH </span>
        <span style={{ color: '#159897' }}>USER </span>
        <span style={{ color: '#21ADA8' }}>BY </span>
        <span style={{ color: '#5FD1C7' }}>EMAIL </span>
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

export default SearchTotal;
