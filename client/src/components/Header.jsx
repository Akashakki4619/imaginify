import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import './Header.css';
import { motion } from "motion/react";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
    <motion.div
      className="header-container"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="header-top"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="header-subtitle">Best text to image generator</p>
        <img src={assets.star_icon} alt="Star Icon" className="header-star" />
      </motion.div>
      
      <motion.h1
        className="header-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Turn text to image, in seconds.
      </motion.h1>
      
      <motion.p
        className="header-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art in seconds—just type, and watch the magic happen.
      </motion.p>
      
      <motion.button
        onClick={onClickHandler}
        className="generate-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Generate Image
        <img src={assets.star_group} alt="Star Group" className="btn-icon" />
      </motion.button>
      
      <motion.div
        className="image-gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 1 } }
        }}
      >
        {Array(6)
          .fill('')
          .map((item, index) => (
            <motion.img
              key={index}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt={`Sample ${index}`}
              className="gallery-image"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
            />
          ))}
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
