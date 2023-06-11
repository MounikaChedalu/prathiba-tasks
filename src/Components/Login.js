import React from 'react';
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Login = ({setId,setTokenu}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgtext,setMsgtext] = useState('');
  const navigate= useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setMsgtext('');

    try {
        const response = await axios.post('https://test.e-prathibha.com/apis/login', {
      email: email,
        password: password
      });
      if(response.data.status === 200){
        setMsgtext(response.data.data.Message);
        navigate("/Exams");
      }
      else{
        setMsgtext(response.data.data);
      }

      setEmail('');
      setPassword('');
        setId(response.data.data.Id);
      setTokenu(response.data.data.Token);
      console.log(response.data);
    
    } catch(error) {
        console.error('Login failed:', error);
    }
  };


  return (
    <div >
      <Navbar />
      <form className='form'>
        <h2>Login Form</h2>
      <div>
        <label className='label'>Email:</label>
        <input type="text"
          className="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label className='label'>Password:</label>
        <input type="password"
          className="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
        <h4 className='msgtext'>{msgtext}</h4>
      <button 
      onClick = {handleClick} className='button'
      type="submit">Login</button>
        <div>
          <span>Don't have an account? </span>
          <Link to="/registration">Register</Link>
        </div>

    </form>
    </div>
  )
}

export default Login;


