import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Registration.css';

const Registration = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://54.236.236.189:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
            toast.success('Registration successful , Please Login');
            setTimeout(() =>{
              navigate('/login')
            },2000)
        } 
        else {
          toast.error(`Registration Failed`);
      }
      } catch (error) {
        console.error('Login failed:', error.response.data.msg);
        toast.error('Error during registration');
      }
    
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
          <label>Full name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Full name'/>

          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='username'/>

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='password'/>

        <button type="submit">Register</button>
      </form>
      <p>
        Already registered ? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Registration;