import Nav from '../components/Nav' 
import AuthModal from '../components/AuthModal'
import {useState, useEffect} from 'react'

function Leaderboard(){

    const[showModal, setShowModal] = useState(false);
    const[isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    function handleClick() {
        console.log('clicked');
        setShowModal(true);
        setIsSignUp(true);
    }

    return (
        <div className="overlay">
            <Nav whitePage={false}
                authToken={authToken}
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
            <div className="leaderboard_home">
                <h1 className="primary-title">Leaderboard</h1>

                <div className="leaderboard_table">
                    <table>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Adam</td>
                            <td>810</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Bob</td>
                            <td>630</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Charlene</td>
                            <td>550</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Desmond</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Evelyn</td>
                            <td>300</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>


                <button className="primary-button" onClick={handleClick} style={{ marginTop: '30px' }}>
                    {'Submit Total'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

            </div>
        </div>
        
    );
}

export default Leaderboard;
 