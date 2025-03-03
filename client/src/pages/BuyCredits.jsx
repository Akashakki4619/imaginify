import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import './BuyCredits.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BuyCredits = () => {
  const { user, backendUrl, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, // should be in paise (if your API sends paise)
      currency: order.currency,
      name: 'Credits payment',
      description: 'Credits payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // Optionally, call a backend API to verify the payment or update credits.
        try {
          
          const {data}  = await axios.post(backendUrl+'/api/user/verify-razor',response,{headers:{token}})
          if(data.success)
          {
            loadCreditsData();
            navigate('/')
            toast.success('credit added')
          }

        } catch (error) {
          toast.error(error.message)
        }
      },
      prefill: {
        // Optionally, add user details for pre-filling the form:
        email: user?.email || '',
        contact: user?.contact || ''
      },
      theme: {
        color: '#6200ee'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return; // Return early if no user is logged in.
      }
      const { data } = await axios.post(
        backendUrl + '/api/user/pay-razor',
        { planId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      className="buy-credits"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.button
        className="plans-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Our Plans
      </motion.button>
      <motion.h1
        className="title"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Choose the Plan
      </motion.h1>
      <div className="plans-container">
        {plans.map((item, index) => (
          <motion.div
            key={index}
            className="plan-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              className="logo-icon"
              width={40}
              src={assets.logo_icon}
              alt="Logo Icon"
            />
            <p className="plan-id">{item.id}</p>
            <p className="plan-desc">{item.desc}</p>
            <p className="plan-price">
              <span>${item.price}</span>/{item.credits} credits
            </p>
            <motion.button
              onClick={() => paymentRazorpay(item.id)}
              className="purchase-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? 'Purchase' : 'Get Started'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredits;
