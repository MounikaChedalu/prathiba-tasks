import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Packagedetails.css';
import { Link, useNavigate } from 'react-router-dom';

const Packagedetails = ({ id, tokenu, serverKey }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [amount1, setAmount1] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  
  const fetchData = async () => {
    try {
      const response = await axios.post(
        'https://test.e-prathibha.com/apis/packageDetails',
        {},
        {
          headers: {
            id: id,
            tokenu: tokenu,
            server_key: serverKey,
          },
        }
      );
      setName(response.data.data.name);
      setAmount(response.data.data.amount);
      setAmount1(response.data.data.amount_year);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, [id,tokenu,serverKey]);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    if (e.target.value === '6months') {
      setAmount(amount);
    } else if (e.target.value === '1year') {
      setAmount(amount1);
    }
  };

  const payamount = duration === '6months' ? amount : amount1;

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  const handlePayment = async () => {
    const headers = {
      id: id,
      tokenu: tokenu,
      server_key: serverKey,
    };

    const body = {
      packagearr: {
        8: '1',
      },
      packagetype: 'RAZORPAY',
      year: '',
    };

    try {
      const response = await axios.post(
        'https://test.e-prathibha.com/apis/test_paymentGateway',
        body,
        { headers }
      );
      const orderId = response.data.data.order_id;

      const options = {
        key: 'rzp_test_Sea0U959aubTaB',
        amount: payamount * 100,
        currency: 'INR',
        name: 'TEST INTELLIGENTLY LLP',
        description: 'Test Transaction',
        // order_id: 'order_9A33XWu170gUtm',
        callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
        handler: function (response) {
          console.log(response.razorpay_payment_id);
          console.log(response);
          navigate('/paymentresponse', {
            state: { paymentId: response.razorpay_payment_id, orderId: orderId },
          });
        },
        prefill: {
          name: 'Mounika',
          email: 'mounikachedalu01@gmail.com',
          contact: '7702824162',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link to="/TestfreeExam">
        <div className='home'>Home page</div>
      </Link>
      <div className='package-container'>
        <h3 className='package-name'>{name}</h3>
        <div className='duration'>
          <h3>{payamount}</h3>
        </div>
        <select className='select' value={duration} onChange={handleDurationChange}>
          <option value='1year'>1 Year</option>
          <option value='6months'>6 Months</option>
        </select>
        <br />
        <button className='pay-button' id='rzp-button1' onClick={handlePayment}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default Packagedetails;



















