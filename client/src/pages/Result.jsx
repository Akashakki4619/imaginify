import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import './Result.css';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(input)
    {
      const image = await generateImage(input)
      if(image)
      {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
    // Add your image generation logic here
  };

  return (
    <motion.form 
      onSubmit={onSubmitHandler} 
      className="result-form"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="image-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="image-wrapper">
          <img src={image} alt="Generated" className="result-image" />
          <span className="image-overlay"></span>
        </div>
        <motion.p 
          className={`loading-text ${!loading ? 'hidden' : ''}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Loading...
        </motion.p>
      </motion.div>
      {!isImageLoaded && (
        <motion.div 
          className="input-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to display"
            className="result-input"
          />
          <button type="submit" className="generate-button">
            Generate
          </button>
        </motion.div>
      )}
      {isImageLoaded && (
        <motion.div 
          className="actions-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p onClick={() => setIsImageLoaded(false)} className="generate-another">
            Generate Another
          </p>
          <a href={image} download className="download-link">
            Download
          </a>
        </motion.div>
      )}
    </motion.form>
  );
};

export default Result;
