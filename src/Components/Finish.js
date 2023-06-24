import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './finish.css';

function Finish() {
  useEffect(() => {
    noBack();
    return () => {
      window.removeEventListener('popstate', showAlert);
    };
  });

  function noBack() {
    window.addEventListener('popstate', showAlert);
    window.history.forward();
  }

  function showAlert(event) {
    if (event.type === 'popstate') {
      alert('If you want to go back, you will be automatically logged out. Are you sure you want to proceed?');
      window.removeEventListener('popstate', showAlert);
      window.history.go(1);
      window.location.href = '/';
    }
  }

  return (
    <div>
      <h3 className='finish'>Exam Finished</h3>
     <Link to = {`/results`}><Button className='ok-button'>Ok</Button></Link>
     </div>
  );
}

export default Finish;

