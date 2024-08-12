import React from "react";
import Image from "next/image";

export default function EndScreen({
  exam,
  totalPoints,
  selectedAnswers,
  questionPoints,
}) {
  return (
    <div className="max-w-4xl bg-white p-1 md:p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Exam Results</h2>
      <p className="text-lg text-gray-700 mb-4">
        You have scored{" "}
        <span className="font-semibold text-blue-600">
          {totalPoints.toFixed(2)}
        </span>{" "}
        points out of{" "}
        <span className="font-semibold text-blue-600">
          {exam.questions.reduce((acc, q) => acc + q.points, 0)}{" "}
        </span>
        total points.
      </p>
      {exam.questions.map((question, questionIndex) => {
        const selected = selectedAnswers[questionIndex] || [];
        const correct = question.correctAnswers.map(String);
        const earnedPoints = questionPoints[questionIndex] || 0;

        return (
          <div
            key={questionIndex}
            className="mb-6 p-2 md:p-6 border border-gray-200 rounded-lg bg-white shadow-md"
          >
            <div className="mb-2 text-gray-800">
              <span className="font-semibold">
                Question {questionIndex + 1}:
              </span>{" "}
              {question.points} points. You earned:
              <span className="font-semibold text-blue-600">
                {" "}
                {earnedPoints.toFixed(2)}
              </span>{" "}
              points
            </div>
            {question.image && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE}/questions/${question.image}`}
                width={800}
                height={800}
                alt={`Question ${questionIndex + 1}`}
                className="w-full h-auto mb-4 rounded-lg shadow-sm"
              />
            )}
            <ul className="list-none p-0 mb-4">
              {question.answers.map((answer, index) => {
                const answerIndexStr = index.toString();
                const isCorrect = correct.includes(answerIndexStr);
                const isSelected = selected.includes(answerIndexStr);

                let answerClass = "bg-gray-200 text-gray-800";
                if (isCorrect && isSelected) {
                  answerClass = "bg-green-500 text-white";
                } else if (isCorrect) {
                  answerClass = "bg-green-200 text-gray-800";
                } else if (isSelected) {
                  answerClass = "bg-red-500 text-white";
                }

                return (
                  <li
                    key={index}
                    className={`${answerClass} rounded-lg p-4 border border-gray-300 mb-2 transition duration-300 ease-in-out`}
                  >
                    <p>
                      {String.fromCharCode(65 + index)}. {answer}
                    </p>
                  </li>
                );
              })}
            </ul>
            {question.explanation && (
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 text-gray-800">
                <h3 className="font-semibold text-lg text-blue-700">
                  Explanation:
                </h3>
                <p className="mt-2 text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
      <div className="text-center mt-6">
        <span className="text-xl font-semibold text-gray-800">End of Exam</span>
      </div>
    </div>
  );
}
