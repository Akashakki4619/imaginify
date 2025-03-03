import React, { useContext }  from 'react'
import { assets } from '../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const {user,setShowLogin,logout,credit} = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="navbar-logo" />
      </Link>
      <div className="navbar-links">
        {user ? (
          <div className="user-menu">
            <button  className="credits-btn" onClick={() => navigate('/buy')}>
              <img src={assets.credit_star} alt="Credits" className="credit-icon" />
              <p>Credits left: {credit}</p>
            </button>
            <p className="welcome-text">{user.name}</p>
            <div className="profile-container">
              <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
              <div className="dropdown-menu">
                <ul>
                  <li onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="guest-menu">
            <p className="navbar-link" onClick={() => navigate('/buy')}>
              Pricing
            </p>
            <button onClick={()=>setShowLogin(true)} className="login-btn" >
            {/* onClick={() => navigate('/login')} */}
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
