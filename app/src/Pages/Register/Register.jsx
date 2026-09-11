import React, { useState } from 'react';
import './Register.css';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function Register() {

  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();


    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {

      alert('Please fill all the fields');

      return;

    }


    if (password !== confirmPassword) {

      alert('Passwords do not match');

      return;

    }


    try {

      setLoading(true);


      const response = await fetch(
        'http://localhost:4000/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();


      console.log('Register response:', data);


      if (response.ok) {

        alert(data.message);

        navigate('/login');

      }

      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.error(
        'Registration error:',
        error
      );

      alert(
        'Unable to connect to server'
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="register-page">

      <div className="register-circle circle-one"></div>
      <div className="register-circle circle-two"></div>


      <div className="register-card">


        <div className="register-icon">

          <PersonAddIcon />

        </div>


        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join Notes and organize your ideas
        </p>


        <form onSubmit={handleRegister}>


          <label>Username</label>

          <div className="register-input">

            <PersonIcon />

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>


          <label>Email Address</label>

          <div className="register-input">

            <EmailIcon />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <label>Password</label>

          <div className="register-input">

            <LockIcon />

            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="register-password-toggle"
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


          <label>Confirm Password</label>

          <div className="register-input">

            <LockIcon />

            <input
              type={
                showConfirmPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="register-password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >

              {showConfirmPassword
                ? <VisibilityOffIcon />
                : <VisibilityIcon />
              }

            </button>

          </div>


          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >

            <PersonAddIcon />

            {loading
              ? 'Creating account...'
              : 'Create Account'
            }

          </button>


        </form>


        <div className="register-divider">
          <span>OR</span>
        </div>


        <p className="login-switch">

          Already have an account?

          <Link to="/login">
            Sign In
          </Link>

        </p>


      </div>

    </div>

  );
}

export default Register;