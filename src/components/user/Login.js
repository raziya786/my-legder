import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext'

const Login = () => {
    const { loginUpdate } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://54.236.236.189:3000/auth/login', { username, password });
      const user = response.data;
      loginUpdate(user);
      toast.success('Login Success')
      setTimeout(() =>{
        navigate('/transaction');
      },2000)
      

    } catch (error) {
      console.error('Login failed:', error.response.data.msg);
      toast.error('Login Failed : Check Credentials')
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;