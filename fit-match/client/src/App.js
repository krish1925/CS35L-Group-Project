import './index.css'
import Home from './pages/Home.js'
import ViewProfile from './pages/Viewprofile' 
import Dashboard from './pages/Dashboard.js'
import OnBoarding from './pages/OnBoarding'
import Leaderboard from './pages/Leaderboard'
import WorkoutInfo from './pages/WorkoutInfo'
import EditProfile from './pages/EditProfile'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie'


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/workoutInfo" element={<WorkoutInfo/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/onboarding" element={<OnBoarding/>}/>
        <Route path="/viewprofile" element={<ViewProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
