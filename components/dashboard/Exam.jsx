"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Exam = ({ exam }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [currentQuestionIndex]: answerIndex,
    }));
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <main className="px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto p-6 sm:px-6 md:px-8 border border-gray-100 rounded-lg">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
            <span>
              {currentQuestionIndex + 1} / {exam.questions.length}
            </span>
          </div>
          <Image
            src={`/images/${currentQuestion.image}`}
            alt="Question Image"
            width={480}
            height={480}
          />
          <ul className="flex flex-col gap-2 text-white">
            {currentQuestion.answers.map((answer, index) => (
              <li
                key={index}
                className={`${
                  selectedAnswers[currentQuestionIndex] === index
                    ? "bg-orange-500"
                    : "bg-green-500"
                } ${
                  selectedAnswers[currentQuestionIndex] !== index &&
                  "hover:bg-green-400"
                } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
                onClick={() => handleAnswerSelection(index)}
              >
                <label className="cursor-pointer" htmlFor={index}>
                  {String.fromCharCode(65 + index)}. {answer}
                </label>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-2">
            <button
              className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-orange-500 py-4 px-6 shadow-md hover:bg-orange-300 duration-300"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === exam.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
        {/* <div className="basis-1/2">
          <ExamSvg />
        </div> */}
      </div>
    </main>
  );
};

export default Exam;
