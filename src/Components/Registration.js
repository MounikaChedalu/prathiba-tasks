import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './Registration.css';
import axios from 'axios';

const Registration = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const[name,setName] = useState('');
  const[phone,setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msgtext,setMsgtext] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://test.e-prathibha.com/apis/register', {
        email: email,
        name: name,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword
      });
      console.log(response.data.data);
      if(response.data.status === 200){
        navigate('/Emailverification', {state: {code: response.data.data}});
      }else{
        setMsgtext(response.data.data);
      }
  
      setEmail('');
      setName('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');

  } catch (error) {
    console.error('Registration failed:', error);
  }
  };
  

  return (
    <div>
      <form className='form-container'>
        <h2>Registration Form</h2>
        <div>
          <label className='label'>Email:</label>
          <input
            type="text"
            className="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label className='label'>Name:</label>
          <input
            type="text"
            className="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label className='label'>Phone:</label>
          <input
            type="phonenumber"
            className="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div>
          <label className='label'>Password:</label>
          <input
            type="password"
            className="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label className='label'>Confirm Password:</label>
          <input
            type="password"
            className="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <h4>{msgtext}</h4>
        <button onClick={handleClick} className='button' type="submit">
          Register
        </button>
        <div>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
