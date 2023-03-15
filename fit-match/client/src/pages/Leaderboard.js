import Nav from '../components/Nav'
import SubmitTotal from '../components/SubmitTotal'
import SearchTotal from '../components/SearchTotal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();
    const[searchResult, setSearchResult] = useState(false)
    const[showSearch, setShowSearch] = useState(false)

    const authToken = false;

    function handleClick() {
        console.log('clicked');
        setShowModal(true);
    }

    function searchClick() {
        setShowSearch(true);
    }

    useEffect(() => {
        axios.get('http://localhost:8000/leaderboard')
            .then(response => { 
                setLeaderboard((response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const goDashboard = () => {
        navigate('/dashboard');
      };



    return (

        <div className="overlay">
            <Nav whitePage={false}
                authToken={authToken}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp} />
            <div className="leaderboard_home"style={{ marginTop: '40px' }}>

            <div className="leaderboard_home">
            <h1 className="primary-title" style={{fontSize: '60px', marginBottom: '20px'}}>Leaderboard</h1>
                <div className="leaderboard_table">
                    <table>
                        <thead>
                            <tr>
                                <th style={{background: "#007788"}}>Rank</th>
                                <th style={{background: "#159897"}}>Name</th>
                                <th style={{background: "#21ADA8"}}>Powerlifting Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <img src={leaderboard[0]?.url} alt="User Avatar" width="50" height="50" style={{ marginRight: "10px" }} />
                                    <div>{leaderboard[0]?.name}</div>
                                </td>
                                <td>{leaderboard[0]?.total}</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <img src={leaderboard[1]?.url} alt="User Avatar" width="50" height="50" style={{ marginRight: "10px" }} />
                                    <div>{leaderboard[1]?.name}</div>
                                </td>
                                <td>{leaderboard[1]?.total}</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <img src={leaderboard[2]?.url} alt="User Avatar" width="50" height="50" style={{ marginRight: "10px" }} />
                                    <div>{leaderboard[2]?.name}</div>
                                </td>
                                <td>{leaderboard[2]?.total}</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <img src={leaderboard[3]?.url} alt="User Avatar" width="50" height="50" style={{ marginRight: "10px" }} />
                                    <div>{leaderboard[3]?.name}</div>
                                </td>
                                <td>{leaderboard[3]?.total}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <img src={leaderboard[4]?.url} alt="User Avatar" width="50" height="50" style={{ marginRight: "10px" }} />
                                    <div>{leaderboard[4]?.name}</div>
                                </td>
                                <td>{leaderboard[4]?.total}</td>
                            </tr>
                            {searchResult &&(<tr>
                                <td>{searchResult ? (searchResult?.rank):("?")}</td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                {searchResult ? (<img src={searchResult?.url} alt="User Avatar" width="50" height="50" style={{ marginRight: "10px" }} />):(null)}
                                    <div>{searchResult ? (searchResult?.name):("Search a user")}</div>
                                </td>
                                <td>{searchResult ? (searchResult?.total):("?")}</td>
                            </tr>)}
                        </tbody>
                        

                    </table>
                </div>

                <button className="primary-button" onClick={handleClick} style={{ marginTop: '10px', fontSize:'14px', padding: '8px 12px' }}>
                    {'Submit Total'}
                </button>
                <button className="primary-button" onClick={searchClick} style={{ marginTop: '10px', fontSize:'14px', padding: '8px 12px' }}>
                    {'Search User'}
                </button>
                <button className="primary-button" onClick={goDashboard} style={{ marginTop: '10px', fontSize:'14px', padding: '8px 12px'}}>
                    {'Return to Dashboard'}
                </button>
                

                {showModal && (
                    <SubmitTotal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}

                {showSearch && (
                    <SearchTotal setShowSearch={setShowSearch} searchResult={searchResult} setSearchResult={setSearchResult}/>
                )}

            </div>
        </div>
        </div>

    );
}

export default Leaderboard;
