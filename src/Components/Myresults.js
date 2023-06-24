import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './Myresults.css';

const Myresults = ({id,tokenu,serverKey}) => {
    const [results, setResults] = useState([]);

     const fetchData = async (e) => {
    
     try {
          const response = await axios.post('https://test.e-prathibha.com/apis/my_result',
            {
                'id': id
              },
                 {
                      headers:{
                      'id':id,
                      'server_key': serverKey,
                      'tokenu':tokenu
                      }
              }

          );
          console.log(response);
          setResults(response.data.data);
        }
        catch(error){

        }
      
    }
    fetchData();

  return (
    <div>
        <div className='container-box'>
             <h3 className='heading'>Results</h3>
        {results.map((result, index) => (
     <div key={index} className='result-box'>
      <p><span>{index+1}.</span> Result: {result.Result.result}</p>
      <p className='marks'>Marks: {result.Result.obtained_marks}</p>
    </div>
            
        ))}
        </div>

    </div>
  )
};
export default Myresults;












