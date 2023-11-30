import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [success, setSuccess ] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', loginData);
      console.log('Login successful!', response.data);
      setSuccess(true);
      // Optionally, you can redirect the user to another page upon successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div style={{marginLeft:'20px'}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={loginData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={loginData.password} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {
        success && <h6>Logged In</h6>
      }
    </div>
  );
};

export default Login;
