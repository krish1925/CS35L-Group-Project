//big sign up form
import { navigate } from '@reach/router';
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditProfile() {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: undefined,
        last_name: undefined,
        show_gender: undefined,
        gender_identity: undefined,
        gender_interest: undefined,
        url: undefined,
        about: undefined,
        workout_time: undefined,
        workout_intensity: undefined,
        favorite_exercise: undefined,
        goals: undefined,
    })

    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/editProfile', { formData })
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(formData);

    return (
        <>
            <Nav
                whitePage={true}
                setShowModal={() => { }}
                showModal={false}
            />
            <div className="onboarding">
                <h2>EDIT YOUR PROFILE</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />



                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="male"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'Male'}
                            />
                            <label htmlFor="male-gender-identity">Male</label>
                            <input
                                id="female-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="female"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'Female'}
                            />
                            <label htmlFor="female-gender-identity">Female</label>
                            <input
                                id="other-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="other"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'Other'}
                            />
                            <label htmlFor="other-gender-identity">Other</label>
                        </div>

                        <label htmlFor="show-gender">Show gender on my profile</label>

                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />

                        <label>Show Me</label>

                        <div className="multiple-input-container">
                            <input
                                id="male-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="male"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'Male'}
                            />
                            <label htmlFor="male-gender-interest">Male</label>
                            <input
                                id="female-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="female"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'Female'}
                            />
                            <label htmlFor="female-gender-interest">Female</label>
                            <input
                                id="everyone-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="everyone"
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
                            value={formData.about}
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
                        />

                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile picture preview" />}
                        </div>
                        <label>Preferred Workout Time</label>
                        <div className="multiple-input-container">
                            <input
                                id="morning-workout-time"
                                type="radio"
                                name="workout_time"
                                value="morning"
                                onChange={handleChange}
                                checked={formData.workout_time === 'Morning'}
                            />
                            <label htmlFor="morning-workout-time">Morning</label>
                            <input
                                id="midday-workout-time"
                                type="radio"
                                name="workout_time"
                                value="midday"
                                onChange={handleChange}
                                checked={formData.workout_time === 'Midday'}
                            />
                            <label htmlFor="midday-workout-time">Midday</label>
                            <input
                                id="night-workout-time"
                                type="radio"
                                name="workout_time"
                                value="night"
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
                                value="light"
                                onChange={handleChange}
                                checked={formData.workout_intensity === 'Light'}
                            />
                            <label htmlFor="light-workout-intensity">Light</label>
                            <input
                                id="medium-workout-intensity"
                                type="radio"
                                name="workout_intensity"
                                value="medium"
                                onChange={handleChange}
                                checked={formData.workout_intensity === 'Medium'}
                            />
                            <label htmlFor="medium-workout-intensity">Medium</label>
                            <input
                                id="intense-workout-intensity"
                                type="radio"
                                name="workout_intensity"
                                value="intense"
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
                        <label htmlFor="goals">Goals</label>
                        <input
                            id="goals"
                            type="text"
                            name="goals"
                            placeholder="What are your gym goals?"
                           
                            value={formData.goals}
                            onChange={handleChange}
                        />
                        <input type="submit" />
                    </section>

                </form>

            </div>
        </>
    );
}

export default EditProfile;