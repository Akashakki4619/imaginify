import React from 'react'
import { assets } from '../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <img className="logo" src={assets.logo} alt="Logo" width={150} />
      <p>Copyright @4546.dev | All rights reserved.</p>
      <div className="social-icons">
        <img src={assets.instagram_icon} alt="Instagram" width={35} />
        <img src={assets.facebook_icon} alt="Facebook" width={35} />
        <img src={assets.twitter_icon} alt="Twitter" width={35} />
      </div>
    </div>
  )
}

export default Footer
