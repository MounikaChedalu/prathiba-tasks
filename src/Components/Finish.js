import React, { useEffect } from 'react';

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
    <div className='text-center'>
      <h3>Exam Finished</h3>
    </div>
  );
}

export default Finish;

