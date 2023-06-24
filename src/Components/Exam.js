import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Exam.css";

const Exam = ({ serverKey, id, tokenu }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

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

  const saveQuestion = async (id, serverKey, tokenu, examId) => {
    const headers = {
      id: id,
      server_key: serverKey,
      tokenu: tokenu,
    };

    const currentQuestion = questions[currentQuestionIndex];
    const qusno = currentQuestion.ExamStat.ques_no;

    const body = {
      data: {
        Exam: {
          lang: "1",
          option_selected: selectedOption,
        },
      },
      examId: examId,
      qId: qusno,
    };

    try {
      const response = await axios.post(
        "https://test.e-prathibha.com/apis/save_ques",
        body,
        { headers }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  function handleNext() {
    if (!selectedOption) {
      const confirmed = window.confirm(
        "Are you sure you want to skip this question?"
      );
      if (!confirmed) {
        return;
      }
    }

    saveQuestion(id, serverKey, tokenu, examId);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption("");
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
    return <div></div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion.ExamStat.exam_result_id);
  const examResultId = currentQuestion.ExamStat.exam_result_id;
  localStorage.setItem("exam_result_id", examResultId);

  return (
    <div>
      <div className="total">
        <h5>Question</h5>
        <span>{currentQuestion.ExamStat.ques_no}.</span>
        <span>{currentQuestion.Question.question.above}</span>
        <div>
          <h6 className="options">Options</h6>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option1}
            checked={selectedOption === currentQuestion.Question.option1}
            onChange={() =>
              setSelectedOption(currentQuestion.Question.option1)
            }
          />
          {currentQuestion.Question.option1}
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option2}
            checked={selectedOption === currentQuestion.Question.option2}
            onChange={() =>
              setSelectedOption(currentQuestion.Question.option2)
            }
          />
          {currentQuestion.Question.option2}
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option3}
            checked={selectedOption === currentQuestion.Question.option3}
            onChange={() =>
              setSelectedOption(currentQuestion.Question.option3)
            }
          />
          {currentQuestion.Question.option3}
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value={currentQuestion.Question.option4}
            checked={selectedOption === currentQuestion.Question.option4}
            onChange={() =>
              setSelectedOption(currentQuestion.Question.option4)
            }
          />
          {currentQuestion.Question.option4}
        </div>
      </div>
      <div className="buttons">
        <Button className="nextbutton" onClick={handleNext}>
          Save and Next
        </Button>
        <Button onClick={handleFinish} className="finishbutton">
          Finish Exam
        </Button>
      </div>
    </div>
  );
};

export default Exam;
