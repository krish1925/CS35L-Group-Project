import './index.css'
import Home from './pages/Home.js'
import ViewProfile from './pages/Viewprofile' 
import Dashboard from './pages/Dashboard.js'
import OnBoarding from './pages/OnBoarding'
import Leaderboard from './pages/Leaderboard'
import EditProfile from './pages/EditProfile'
import Tracking from './pages/Tracking'
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
        <Route path="/tracking" element={<Tracking/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/onboarding" element={<OnBoarding/>}/>
        <Route path="/viewprofile" element={<ViewProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
