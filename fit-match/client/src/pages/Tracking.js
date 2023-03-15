import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'

function Tracking() {
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [showProfile, setShowProfile] = useState(false);
    const[error, setError] = useState(null)
    const[email, setEmail] = useState(null)
    const[total, setTotal] = useState(null)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        workout_time: '',
        workout_intensity: '',
        favorite_exercise: '',
        goals: ''
      });

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {}

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        if (name === "lift") {
            if (value === "bench") {
                setBench(true);
            } else if (value === "deadlift") {
                setDeadlift(true);
            } else if (value === "squat") {
                setSquat(true);
            }
        }
    }
    

    const goLeaderboard = () => {
        navigate('/leaderboard');
    };

    const [bench, setBench] = useState(false)
    const [squat, setSquat] = useState(false)
    const [deadlift, setDeadlift] = useState(false)



    return (
        <>
    <Nav 
                whitePage={true}
                setShowModal={() => {}}
                showModal={false}
            />
            <div className='tracking-container'>
            <div className="onboarding">
                <h2>TRACK YOUR PROGRESS</h2>

                <form onSubmit={handleSubmit}>
                 
                   

                
                        <label>Lift</label>
                        <div className="multiple-input-container">
                            <input 
                                id="bench"
                                type="radio"
                                name="lift"
                                value="bench"
                                onChange={handleChange}
                                checked={bench}
                            />
                            <label htmlFor="bench">Bench</label>
                            <input 
                                id="squat"
                                type="radio"
                                name="lift"
                                value="squat"
                                onChange={handleChange}
                                checked={squat}
                            />
                            <label htmlFor="squat">Squat</label>
                            <input 
                                id="deadlift"
                                type="radio"
                                name="lift"
                                value="deadlift"
                                onChange={handleChange}
                                checked={deadlift}
                            />
                            <label htmlFor="deadlift">Deadlift</label>
                        </div>   
                        

                    

                </form>

            </div></div>
        </>
    );
}

export default Tracking;