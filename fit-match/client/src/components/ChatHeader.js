import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    navigate('/')
    window.location.reload()
    alert('You have successfully logged out of your account')
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?')
    if (confirmLogout) {
      logout()
    }
  }

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} alt={"photo"}/>
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default ChatHeader;
