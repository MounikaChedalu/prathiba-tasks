import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Paymentresponse.css';



const PaymentResponse = () => {
  const [msg,setMsg] = useState('');
  const location = useLocation();
  const { orderId,paymentId} = location.state ||{};

    useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.post(
              'https://test.e-prathibha.com/apis/success',
              {
                orderId: orderId,
                razorpay_payment_id: paymentId,
                }
             
            );
            console.log(response.data);
            setMsg(response.data.data)
            
            
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      },[orderId,paymentId]);
  return (
    <div>
   <h5 className='msg'>{msg}</h5>
       <Link to="/TestfreeExam">
         <Button className='ok-button1'>ok</Button>
     </Link>
    </div>
  )
}

export default PaymentResponse;





































