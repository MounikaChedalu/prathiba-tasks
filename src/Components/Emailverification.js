import React, { useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import './Emailverification.css';

const Emailverification = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const[msgtext,setMsgtext] = useState('');
  const location = useLocation();
  const {code} = location.state || '';

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://test.e-prathibha.com/apis/verifyEmail', {
        reg_code: verificationCode
      });


      if(response.data.status === 200){
        setMsgtext(response.data.data.message);
        navigate("/Login");
      }else{
        setMsgtext(response.data.data)
      }
      console.log('Response:', response.data);

      setVerificationCode('');
    } catch (error) {
      console.error('Email verification failed:', error.response.data);

    }
  };

  return (
    <div>
      <form>
        <label className='label'>Verification Code:</label>
        <input
          type="text"
          className='input'
          value={verificationCode}
          onChange={handleChange}
          required
        />
        <button onClick={handleClick}type="submit" className='verify'>Verify</button><br /><br />
        <h5 className='msg'>{msgtext}</h5>
      </form>
      <h4 className='code'>{code}</h4>
    </div>
  );
};

export default Emailverification;




