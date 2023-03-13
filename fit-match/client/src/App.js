import './index.css'
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard.js'
import OnBoarding from './pages/OnBoarding'
import Leaderboard from './pages/Leaderboard'
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
        {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
        {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
