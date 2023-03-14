//big sign up form
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';

function WorkoutInfo() {
const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    workout_time: '',
    workout_intensity: '',
    favorite_exercise: '',
    goals: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('submitted');
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/workout', formData);
      const success = response.status === 200;
      if (success) navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  console.log(formData);

  return (
    <>
      <Nav whitePage={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>SET UP YOUR WORKOUT PREFERENCES</h2>

        <form onSubmit={handleSubmit}>
          <section>
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
          </section>


                        

                    <section>
                    <label htmlFor="favorite_exercise">Favorite Exercise</label>
                        <input 
                            id="favorite_exercise"
                            type="text"
                            name="favorite_exercise"
                            placeholder="What's your favorite thing to do in the gym?"
                            required={true}
                            value={formData.favorite_exercise}
                            onChange={handleChange}
                        />
                        <label htmlFor="goals">Goals</label>
                        <input 
                            id="goals"
                            type="text"
                            name="goals"
                            placeholder="What are your gym goals?"
                            required={true}
                            value={formData.goals}
                            onChange={handleChange}
                        />
                        <input type="submit"/>
                    </section>

                </form>

            </div>
        </>
    );
}

export default WorkoutInfo;