import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import './Login.css'
import { motion } from 'framer-motion';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.div 
      className="login-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="login-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.form onSubmit={onSubmitHandler}
          className="login-form"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {state}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Welcome back! Please sign in to continue
          </motion.p>
          {state !== 'Login' && (
            <motion.div 
              className="input-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src={assets.logo_icon} alt="Logo Icon" />
              <input 
                onChange={e => setName(e.target.value)} 
                value={name} 
                type="text" 
                placeholder="Full Name" 
                required 
              />
            </motion.div>
          )}
          <motion.div 
            className="input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img src={assets.email_icon} alt="Email Icon" />
            <input 
              type="email" 
              placeholder="Email Id" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </motion.div>
          <motion.div 
            className="input-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </motion.div>
          <motion.p 
            className="forgot-password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Forgot Password
          </motion.p>
          <motion.button 
            type="submit" 
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {state === 'Login' ? 'Login' : 'Create Account'}
          </motion.button>
          {state === 'Login' ? (
            <motion.p 
              className="switch-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')}>Sign up</span>
            </motion.p>
          ) : (
            <motion.p 
              className="switch-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Already have an account?{' '}
              <span onClick={() => setState('Login')}>Login</span>
            </motion.p>
          )}
          <motion.img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="close-icon"
            whileHover={{ rotate: 90, scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default Login;
