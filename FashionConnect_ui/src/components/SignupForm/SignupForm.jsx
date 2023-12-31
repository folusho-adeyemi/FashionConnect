import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css'
import { UserContext } from '../../UserContext.jsx';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [First_Name, setFirst_Name] = useState('');
  const [Last_Name, setLast_Name] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the signup API request
      const response = await fetch(`https://fashionconnectapi.onrender.com/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ First_Name, Last_Name, username, email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        // Reset form fields
        setFirst_Name('');
        setLast_Name('');
        setUsername('');
        setEmail('');
        setPassword('');


        // Update the user context
        updateUser(loggedInUser);

        // Navigate to the home page after successful login
        navigate('/');
      } else {
        // Handle signup failure case
        alert('Signup failed');
      }
    } catch (error) {
      // Handle any network or API request errors
      alert('Signup failed: ' + error);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="First_Name">First-Name:</label>
          <input
            type="text"
            id="First_Name"
            value={First_Name}
            onChange={(e) => setFirst_Name(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Last_Name">Last-Name:</label>
          <input
            type="text"
            id="Last_Name"
            value={Last_Name}
            onChange={(e) => setLast_Name(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="signup-button" type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;