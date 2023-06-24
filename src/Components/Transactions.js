import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = ({ id, tokenu, serverKey }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post('https://test.e-prathibha.com/apis/transactions',
          {},
          {
            headers: {
              id: id,
              tokenu: tokenu,
              server_key: serverKey,
            },
          }
        );
        console.log(response);
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [serverKey, tokenu, id]);

  return (
    <div>
      <h1>Transactions</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.Payment.transaction_id}</td>
              <td>{transaction.Payment.amount}</td>
              <td>{transaction.Payment.date}</td>
              <td>{transaction.Payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;


























