"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import EndScreen from "./EndScreen";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import Timer from "@/components/dashboard/examForms/Timer";
import { calculatePoints } from "@/utils/calculatePoints";
import { useSelector } from "react-redux";
import {
  CarbonNextOutline,
  FormkitSubmit,
  MaterialSymbolsPauseOutline,
  MaterialSymbolsPlayArrowOutline,
} from "@/components/dashboard/examForms/Icons";

export default function ExamViewer({ exam }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showTotalPoints, setShowTotalPoints] = useState(false);
  const [questionPoints, setQuestionPoints] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60);
  const [showOverlay, setShowOverlay] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const userId = user._id;

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/sessions/session?userId=${userId}&examId=${exam._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const session = await response.json();
      if (session) {
        setTimeRemaining(session.remainingTime);
        setIsPaused(session.isPaused);
        setCurrentQuestionIndex(session.currentQuestionIndex);
        setAnswers(session.selectedAnswers);
        setTotalPoints(session.totalPoints);
        setQuestionPoints(session.questionPoints);
      }
    };
    fetchSession();
  }, [userId, exam._id, token]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent Print Screen (PrintScreen key on Windows)
      if (e.key === "PrintScreen") {
        e.preventDefault();
        document.body.style.filter = "blur(10px)";
        alert("Screenshots are not allowed!");
      }

      // Prevent Ctrl + Shift + S (Snipping Tool)
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        document.body.style.filter = "blur(10px)";
        alert("Screenshots are not allowed!");
      }

      // Prevent Windows Key + Shift + S (Snipping Tool on Windows)
      if (e.metaKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        document.body.style.filter = "blur(10px)";
        alert("Screenshots are not allowed!");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAnswerSelect = (value) => {
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((answer) => answer !== value)
        : [...prevSelected, value]
    );
  };

  const handlePauseButton = () => {
    if (!isPaused) {
      setShowOverlay(true);
    } else {
      handleConfirmPause();
    }
  };

  const handleConfirmPause = async () => {
    const newPauseState = !isPaused;
    setIsPaused(newPauseState);
    setShowOverlay(false);

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/sessions/store-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          examId: exam._id,
          remainingTime: timeRemaining,
          isPaused: newPauseState,
          currentQuestionIndex,
          selectedAnswers: answers,
          totalPoints,
          questionPoints,
        }),
      }
    );
  };

  const handleNextQuestion = () => {
    const currentQuestion = exam.questions[currentQuestionIndex];
    const points = calculatePoints(selectedAnswers, currentQuestion);
    setTotalPoints((prevPoints) => prevPoints + points);
    setAnswers((prev) => [...prev, selectedAnswers]);
    setQuestionPoints((prevPoints) => [...prevPoints, points]);
    setSelectedAnswers([]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    const currentQuestion = exam.questions[currentQuestionIndex];
    const points = calculatePoints(selectedAnswers, currentQuestion);
    const finalPoints = totalPoints + points;
    setAnswers((prev) => [...prev, selectedAnswers]);
    setQuestionPoints((prevPoints) => [...prevPoints, points]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/sessions/submit-exam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId,
            examId: exam._id,
            answers: [...answers, selectedAnswers],
            points: finalPoints,
            questionPoints: [...questionPoints, points],
          }),
        }
      );

      const result = await response.json();
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    setTotalPoints(finalPoints);
    setShowTotalPoints(true);
    setSelectedAnswers([]);
    setIsPaused(false);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isSubmitDisabled = selectedAnswers.length === 0;
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="bg-gray-50 min-h-screen flex flex-col items-center md:p-6 rounded-lg"
    >
      {showTotalPoints ? (
        <EndScreen
          exam={exam}
          totalPoints={totalPoints}
          selectedAnswers={answers}
          questionPoints={questionPoints}
        />
      ) : (
        <div className="max-w-4xl bg-white p-1 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4 uppercase">
            {exam.title}
          </h2>
          <div className="w-fit mx-auto grid justify-center items-center p-2 md:p-4 border border-gray-100 rounded-lg">
            <div className="flex flex-col justify-center gap-4">
              <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
                <span className="uppercase">
                  Points: {currentQuestion?.points}
                </span>
                <Timer
                  initialTime={timeRemaining}
                  isPaused={isPaused}
                  onTimeChange={setTimeRemaining}
                />
                <span>
                  {currentQuestionIndex + 1} of {exam.questions.length}
                </span>
              </div>
              {currentQuestion?.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE}/${currentQuestion.image}`}
                  width={800}
                  height={800}
                  alt="question"
                  draggable={false}
                />
              )}
              <ul className="flex flex-col gap-2 text-white">
                {currentQuestion?.answers.map((answer, index) => (
                  <li
                    key={index}
                    className={`${
                      selectedAnswers.includes(index.toString())
                        ? "bg-orange-500"
                        : "bg-green-500 hover:bg-green-400"
                    } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
                    onClick={() => handleAnswerSelect(index.toString())}
                  >
                    <label className="cursor-pointer" htmlFor={index}>
                      {String.fromCharCode(65 + index)}. {answer}
                    </label>
                    <input
                      className="hidden"
                      type="checkbox"
                      name={currentQuestionIndex.toString()}
                      id={index.toString()}
                      value={index.toString()}
                    />
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center gap-2">
                <button
                  className={`flex justify-center items-center gap-2 rounded-lg uppercase text-white ${
                    !isPaused ? "bg-orange-500" : "bg-blue-500"
                  }  py-4 px-6 shadow-md hover:bg-orange-300 duration-300`}
                  onClick={handlePauseButton}
                >
                  {isPaused ? (
                    <MaterialSymbolsPlayArrowOutline />
                  ) : (
                    <MaterialSymbolsPauseOutline />
                  )}
                  {isPaused ? "Continue" : "Pause"}
                </button>
                {isLastQuestion ? (
                  <button
                    className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
                    disabled={isSubmitDisabled}
                    onClick={handleSubmit}
                  >
                    <FormkitSubmit />
                    Submit
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
                    disabled={isSubmitDisabled}
                    onClick={handleNextQuestion}
                  >
                    <CarbonNextOutline />
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
          {showOverlay && (
            <OverlayAlert
              title="Pause Exam"
              description="Are you sure you want to pause the exam?"
              onConfirm={handleConfirmPause}
              onCancel={() => setShowOverlay(false)}
              confirmButtonColor="bg-orange-400"
              iconColor="text-orange-400"
            />
          )}
        </div>
      )}
    </div>
  );
}
