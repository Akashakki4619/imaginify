import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import './Testimonials.css'
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <motion.div 
      className="testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="testimonials-header"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h1>Customer Testimonials</h1>
        <p>What our Users Are Saying</p>
      </motion.div>
      <div className="testimonial-list">
        {testimonialsData.map((testimonial, index) => (
          <motion.div 
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              className="testimonial-image"
              src={testimonial.image}
              alt=""
            />
            <h2>{testimonial.name}</h2>
            <p className="testimonial-role">{testimonial.role}</p>
            <div className="rating">
              {Array(testimonial.stars)
                .fill()
                .map((item, index) => (
                  <img key={index} src={assets.rating_star} alt="star" />
                ))}
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials
