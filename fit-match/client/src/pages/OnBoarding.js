//big sign up form
import { navigate } from '@reach/router';
import {useState} from 'react'
import { useCookies } from 'react-cookie'
import Nav from '../components/Nav'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function OnBoarding() {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState ({
        user_id: cookies.UserId,
        first_name: '',
        last_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_gender: '',
        gender_identity: '',
        gender_interest: '',
        url: '',
        about: '',
        matches: []
    })

    let navigate = useNavigate()


    const handleSubmit = async(e) => {
        console.log('submitted');
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;

        setFormData ((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    console.log(formData);

    return (
        <>
            <Nav 
                whitePage={true}
                setShowModal={() => {}}
                showModal={false}
            />
            <div className="onboarding">
                <h2>
                    <span style={{color:'#007788'}}>SET </span>
                    <span style={{color:'#159897'}}>UP </span>
                    <span style={{color:'#21ada8'}}>YOUR </span>
                    <span style={{color:'#8cd6a2'}}>PROFILE </span>
                </h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input 
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label htmlFor="last_name">Last Name</label>
                        <input 
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            required={true}
                            value={formData.last_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input 
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />
                            <input 
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />
                            <input 
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input 
                                id="male-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="Male"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'Male'}
                            />
                            <label htmlFor="male-gender-identity">Male</label>
                            <input 
                                id="female-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="Female"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'Female'}
                            />
                            <label htmlFor="female-gender-identity">Female</label>
                            <input 
                                id="other-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="Other"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'Other'}
                            />
                            <label htmlFor="other-gender-identity">Other</label>
                        </div>

                        <label>Show Me</label>
                        
                        <div className="multiple-input-container">
                            <input 
                                id="male-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="Male"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'Male'}
                            />
                            <label htmlFor="male-gender-interest">Male</label>
                            <input 
                                id="female-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="Female"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'Female'}
                            />
                            <label htmlFor="female-gender-interest">Female</label>
                            <input 
                                id="everyone-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="Everyone"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'Everyone'}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About Me</label>
                        <input 
                            id="about"
                            type="text"
                            name="about"
                            placeholder="Tell me something about yourself."
                            required={true}
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <label htmlFor="goals">Goals</label>
                        <input
                            id="goals"
                            type="text"
                            name="goals"
                            placeholder="What are your gym goals?"
                           
                            value={formData.goals}
                            onChange={handleChange}
                        />
                        
                    </section>

                    <section>
                        <label htmlFor="about">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />

                        <div className="photo-container">
                         {formData.url &&   <img src={formData.url} alt="profile picture preview"/>}
                        </div>

                        <label>Preferred Workout Time</label>
                        <div className="multiple-input-container">
                            <input
                                id="morning-workout-time"
                                type="radio"
                                name="workout_time"
                                value="Morning"
                                onChange={handleChange}
                                checked={formData.workout_time === 'Morning'}
                            />
                            <label htmlFor="morning-workout-time">Morning</label>
                            <input
                                id="midday-workout-time"
                                type="radio"
                                name="workout_time"
                                value="Midday"
                                onChange={handleChange}
                                checked={formData.workout_time === 'Midday'}
                            />
                            <label htmlFor="midday-workout-time">Midday</label>
                            <input
                                id="night-workout-time"
                                type="radio"
                                name="workout_time"
                                value="Night"
                                onChange={handleChange}
                                checked={formData.workout_time === 'Night'}
                            />
                            <label htmlFor="night-workout-time">Night</label>
                        </div>

                        <label>Preferred Workout Intensity</label>

                        <div className="multiple-input-container">
                            <input
                                id="light-workout-intensity"
                                type="radio"
                                name="workout_intensity"
                                value="Light"
                                onChange={handleChange}
                                checked={formData.workout_intensity === 'Light'}
                            />
                            <label htmlFor="light-workout-intensity">Light</label>
                            <input
                                id="medium-workout-intensity"
                                type="radio"
                                name="workout_intensity"
                                value="Medium"
                                onChange={handleChange}
                                checked={formData.workout_intensity === 'Medium'}
                            />
                            <label htmlFor="medium-workout-intensity">Medium</label>
                            <input
                                id="intense-workout-intensity"
                                type="radio"
                                name="workout_intensity"
                                value="Intense"
                                onChange={handleChange}
                                checked={formData.workout_intensity === 'Intense'}
                            />
                            <label htmlFor="intense-workout-intensity">Intense</label>
                        </div>
                        <label htmlFor="favorite_exercise">Favorite Exercise</label>
                        <input
                            id="favorite_exercise"
                            type="text"
                            name="favorite_exercise"
                            placeholder="What's your favorite thing to do in the gym?"
                          
                            value={formData.favorite_exercise}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                </form>

            </div>
        </>
    );
}

export default OnBoarding;