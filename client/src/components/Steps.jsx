import React from 'react';
import { stepsData } from '../assets/assets';
import './Steps.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Steps = () => {
  return (
    <motion.div
      className="steps-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h1
        className="steps-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How it works
      </motion.h1>
      <motion.p
        className="steps-subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Transform words Into Stunning Images
      </motion.p>
      <div className="steps-list">
        {stepsData.map((item, index) => (
          <motion.div key={index} className="step-item" variants={stepVariants}>
            <img
              src={item.icon}
              alt={`Step ${index + 1} icon`}
              className="step-icon"
            />
            <div className="step-content">
              <h2 className="step-title">{item.title}</h2>
              <p className="step-description">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
