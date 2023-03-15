// import { useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import Nav from '../components/Nav'
// import Chart from '../components/Chart.js';

// function Tracking() {
//     const [user, setUser] = useState(null)
//     const [cookies, setCookie, removeCookie] = useCookies(['user'])
//     const [genderedUsers, setGenderedUsers] = useState(null)
//     const [showProfile, setShowProfile] = useState(false);
//     const [error, setError] = useState(null)
//     const [email, setEmail] = useState(null)
//     const [total, setTotal] = useState(null)
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         user_id: cookies.UserId,
//         date: '',
//         mile_time: ''
//     });

//     const userId = cookies.UserId

//     const getUser = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/user', {
//                 params: { userId }
//             })
//             setUser(response.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     const handleSubmit = async () => {}

//     function handleChange(e) {
//         const value = e.target.value;
//         const name = e.target.name;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     }
    
//     const handleLogSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Send the formData in the request body
//             const response = await axios.post('http://localhost:8000/mile-log', formData)
//             console.log(response.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const goLeaderboard = () => {
//         navigate('/leaderboard');
//     };

//     return (
//         <>
//             <Nav 
//                 whitePage={true}
//                 setShowModal={() => {}}
//                 showModal={false}
//             />
//             <div className='tracking-container'>
//                 <h2>TRACK YOUR PROGRESS</h2>
//                 <form onSubmit={handleLogSubmit}>
//                     <label htmlFor="date">Date:</label>
//                     <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
//                     <label htmlFor="mile_time">Mile Time:</label>
//                     <input type="number" id="mile_time" name="mile_time" value={formData.mile_time} onChange={handleChange} required />
//                     <button type="submit">Log Mile Time</button>
//                 </form>
//                 {mileTimes && <Chart mileTimes={mileTimes} />}
//             </div>
//             Chart
//         </>
//     );
// }

// export default Tracking;
