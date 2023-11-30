import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [success, setSuccess ] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', userData);
      setSuccess(true);
      console.log('Registration successful!', response.data);

      // Optionally, you can redirect the user to another page upon successful registration
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div style={{marginLeft:'20px'}}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {
        success && <h6>Registered</h6>
      }
    </div>
  );
};

export default Register;
