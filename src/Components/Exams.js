import React, {useState,useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import './Exams.css';

const Exams = ({ serverKey, tokenu, id}) => {
  const [examList, setExamList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://test.e-prathibha.com/apis/test_free_exam',
        {},
         {
          headers:{
          'id':id,
          'server_key': serverKey,
          'tokenu':tokenu
          }
        });
        setExamList(response.data.data.exams);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching exam list:', error);

      }
    };
   fetchData();
  }, [id, serverKey, tokenu]);

  if (!Array.isArray(examList)) {
    return <div>No exams found.</div>;
  }

  return (
    <div>

          <h1>Free Exam List</h1>
          <Link  className="text" to ="/"><button className='logout'>Logout</button></Link> 
   {examList.map((qps,idx) => {
  const qpType = Object.keys(qps)[0];
  return <div key={idx} id='paperType'>
      <h3 className='headings'>{qpType}</h3>
      {
          qps[qpType].map((paper, idx) => {
              return <div key={idx} id="paper">
                <span className='values'>
                  <b className='value'>Id:</b>  {paper['Exam']['id']}
                  <b className='value'>Name:</b> {paper['Exam']['name']} |
                  <b className='value'>duration:</b> {paper['Exam']['duration']}
                </span>
                  <div className='buttons'>
              <Link to={`/questions/${paper['Exam']['id']}`}><button>Start Exam</button></Link>
              </div>                
              </div>
          })
      }
      
  </div>
 })}
    </div>  

  );
};

export default Exams;














