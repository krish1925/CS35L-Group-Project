import './index.css'
import Home from './pages/Home.js'
import Dashboard from './pages/Dashboard.js'
import OnBoarding from './pages/OnBoarding'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/onboarding" element={<OnBoarding/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
