import "./EditProfile.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext.jsx';

export default function EditProfile() {
  const [username, setUsername] = useState('');
  const [First_Name, setFirst_Name] = useState('');
  const [Last_Name, setLast_Name] = useState('');

  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfileEdit = async (e) => {
    e.preventDefault();

    try {
      const updated_profile_info = await fetch(`https://fashionconnectapi.onrender.com/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, First_Name, Last_Name }),
      });


      if (updated_profile_info.ok) {
        const updatedUser = await updated_profile_info.json();
        updateUser(updatedUser.user);
        navigate('/profile')
      } else {
        // Handle the edit failure case
        alert('Edit failed');
      }
    } catch (error) {
      console.error(error);
      alert('Edit failed: ' + error);
    }
  };

  return (
    <div className='login-form-container'>
      <div className='logo'>

      </div>
      <form className="login-form" onSubmit={handleProfileEdit}>
        <h2>Edit Profile</h2>
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
        <button className="edit" type="submit">Click to Edit</button>
        <p>
          <Link to="/">Click to go Home</Link>
        </p>
      </form>
    </div>
  );
};