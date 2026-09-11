import React, { useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();


    if (email === '' || password === '') {

      alert('Please fill all the fields');

      return;

    }


    try {

      setLoading(true);


      const response = await fetch(
        'http://localhost:4000/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();


      if (response.ok) {

        // SAVE JWT TOKEN

        localStorage.setItem(
          'token',
          data.token
        );


        alert(data.message);


        // GO TO HOME

        navigate('/home');

      }

      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.error('Login error:', error);

      alert(
        'Unable to connect to server'
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-background-circle circle-one"></div>
      <div className="auth-background-circle circle-two"></div>


      <div className="login-card">


        <div className="auth-icon">

          <LockIcon />

        </div>


        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to continue to Notes
        </p>


        <form onSubmit={handleLogin}>


          <label>Email Address</label>

          <div className="input-wrapper">

            <EmailIcon />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <label>Password</label>

          <div className="input-wrapper">

            <LockIcon />

            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />


            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {showPassword
                ? <VisibilityOffIcon />
                : <VisibilityIcon />
              }

            </button>

          </div>


          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            <LoginIcon />

            {loading
              ? 'Signing in...'
              : 'Sign In'
            }

          </button>


        </form>


        <div className="auth-divider">
          <span>OR</span>
        </div>


        <p className="switch-auth">

          Don't have an account?

          <Link to="/register">
            Create Account
          </Link>

        </p>


      </div>

    </div>

  );
}

export default Login;