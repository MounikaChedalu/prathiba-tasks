import React, { useState, useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import './Question.css';

const Questions = ({ serverKey, id, tokenu }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { examId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://test.e-prathibha.com/apis/start_exam?examId=${examId}`,
          {
            headers: {
              id: id,
              server_key: serverKey,
              tokenu: tokenu,
            },
          }
        );
        console.log("response data:", response);
        setQuestions(response.data.data.exam);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [examId, id, tokenu, serverKey]);

  function handleNext() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    const confirmed = window.confirm('Are you sure you want to skip this question?');
    if (!confirmed) {
      return;
    }
  } else {
    selectedOption.checked = false; 
  }

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }
}



  function handleFinish() {
    const data = {
      examId: examId,
      qno: 1,
    };

    axios
      .post("https://test.e-prathibha.com/apis/finishExam", data, {
        headers: {
          id: id,
          server_key: serverKey,
          tokenu: tokenu,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/Finish");
  }
    if (!Array.isArray(questions) || questions.length === 0) {
    return <div>No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="total">
        <h5>Question</h5>
        <span>{currentQuestion.ExamStat.ques_no}.</span>
        <span>{currentQuestion.Question.question.above}</span>
        <div>
          <h6 className="options">Options</h6>
          <input type="radio" name="option" value="option1" />
          {currentQuestion.Question.option1}
        </div>
        <div>
          <input type="radio" name="option" value="option2" />
          {currentQuestion.Question.option2}
        </div>
        <div>
          <input type="radio" name="option" value="option3" />
          {currentQuestion.Question.option3}
        </div>
        <div>
          <input type="radio" name="option" value="option4" />
          {currentQuestion.Question.option4}
        </div>
      </div>
      <div className="buttons">
      <button className = 'nextbutton' onClick={handleNext}>Save and Next
      </button>
      <Link to='/Finish'><button onClick={handleFinish} className="finishbutton" >Finish Exam</button></Link>
      </div>
    </div>
  );
};

export default Questions;



