import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Results.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Results = ({ id, serverKey, tokenu }) => {
  const [results, setResults] = useState('');
  const [marks, setMarks] = useState('');
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examResultId = localStorage.getItem("exam_result_id");

        if (!examResultId) {
          console.log("Exam Result ID not found in the local storage.");
          return;
        }

        const response = await axios.post(
          'https://test.e-prathibha.com/apis/exam_result',
          {
            id: examResultId,
          },
          {
            headers: {
              id: id,
              server_key: serverKey,
              tokenu: tokenu,
            },
          }
        );

        console.log(response);
        setResults(response.data.data.examDetails.Result.result);
        setMarks(response.data.data.examDetails.Result.obtained_marks);
        setPercentage(response.data.data.examDetails.Result.percent);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, serverKey, tokenu]);

  return (
    <div>
      <Link to="/TestfreeExam">
        <div className='home'>Home page</div>
      </Link>
      <Link to="/myresults">
        <Button className='myresults'>my results</Button>
      </Link>
      <Link to ="/myresults"></Link>
      <h4 className='result'>Results</h4>
      <div className='div-container'>
        <p className='result1'>Result: {results}</p>
        <p className='result1'>Marks: {marks}</p>
        <p className='result1'>Percentage: {percentage}</p>
      </div>
    </div>
  );
};

export default Results;
