import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import './GenerateButton.css'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateButton = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  
  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };
  
  return (
    <div className="generate-button-container">
      <h1 className="generate-button-title">See the magic. Try now</h1>
      <button onClick={onClickHandler} className="generate-button">
        Generate Images
        <img className="generate-button-icon" src={assets.star_group} alt="star group" />
      </button>
    </div>
  )
}

export default GenerateButton
