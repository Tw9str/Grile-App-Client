"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import EndScreen from "./EndScreen";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import Timer from "@/components/dashboard/examForms/Timer";
import { calculatePoints } from "@/utils/calculatePoints";
import { useSelector } from "react-redux";
import {
  CarbonNextOutline,
  CarbonPreviousOutline,
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
  const [questionPoints, setQuestionPoints] = useState(
    Array(exam.questions.length).fill(0)
  );
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60);
  const [showOverlay, setShowOverlay] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const userId = user._id;

  useEffect(() => {
    const fetchSession = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    fetchSession();
  }, [userId, exam._id, token]);

  // Prevent screenshots
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && e.key === "S") ||
        (e.metaKey && e.shiftKey && e.key === "S")
      ) {
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

  const handleAnswerSelect = useCallback(
    (value) => {
      setSelectedAnswers((prevSelected) => {
        const updatedSelected = prevSelected.includes(value)
          ? prevSelected.filter((answer) => answer !== value)
          : [...prevSelected, value];

        setAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[currentQuestionIndex] = updatedSelected;
          return newAnswers;
        });

        return updatedSelected;
      });
    },
    [currentQuestionIndex]
  );

  const handlePauseToggle = useCallback(() => {
    setShowOverlay(true);
  }, []);

  const handleConfirmPause = async () => {
    const newPauseState = !isPaused;
    setIsPaused(newPauseState);
    setShowOverlay(false);

    try {
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
    } catch (error) {
      console.error("Error saving session state:", error);
    }
  };

  const saveCurrentAnswers = useCallback(() => {
    const currentQuestion = exam.questions[currentQuestionIndex];
    const points = calculatePoints(selectedAnswers, currentQuestion);

    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = selectedAnswers;
      return newAnswers;
    });

    setQuestionPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints[currentQuestionIndex] = points;
      return newPoints;
    });
  }, [selectedAnswers, currentQuestionIndex, exam.questions]);

  const handleNextQuestion = useCallback(() => {
    saveCurrentAnswers();

    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      setSelectedAnswers(answers[nextIndex] || []);

      return nextIndex;
    });
  }, [saveCurrentAnswers, answers]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      saveCurrentAnswers();

      setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex - 1;

        setSelectedAnswers(answers[newIndex] || []);

        return newIndex;
      });
    }
  }, [saveCurrentAnswers, currentQuestionIndex, answers]);

  const handleJumpToQuestion = useCallback(
    (index) => {
      saveCurrentAnswers();

      setCurrentQuestionIndex(index);
      setSelectedAnswers(answers[index] || []);
    },
    [saveCurrentAnswers, answers]
  );

  const handleSubmit = async () => {
    // Save the current answers (this ensures the last question's answers and points are included)
    saveCurrentAnswers();

    // After saving the current answers, calculate total points
    const updatedQuestionPoints = [...questionPoints]; // Updated points after saveCurrentAnswers is called
    updatedQuestionPoints[currentQuestionIndex] = calculatePoints(
      selectedAnswers,
      exam.questions[currentQuestionIndex]
    ); // Ensure last question points are updated

    // Calculate the final total points from the updated question points
    const finalPoints = updatedQuestionPoints.reduce(
      (acc, points) => acc + points,
      0
    );

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswers; // Save selected answers for the current question

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/sessions/submit-exam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            examId: exam._id,
            answers: updatedAnswers,
            points: finalPoints,
            questionPoints: updatedQuestionPoints.slice(
              0,
              exam.questions.length
            ),
          }),
        }
      );

      const result = await response.json();
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    // Reset state after submission
    setTotalPoints(finalPoints);
    setShowTotalPoints(true);
    setSelectedAnswers([]);
    setIsPaused(false);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = useMemo(
    () => exam.questions[currentQuestionIndex],
    [currentQuestionIndex, exam.questions]
  );

  const isSubmitDisabled =
    selectedAnswers.length === 0 ||
    !exam.questions.every((_, index) => answers[index]?.length > 0);

  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

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
                    {String.fromCharCode(65 + index)}. {answer}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center gap-2">
                <button
                  className={`flex justify-center items-center gap-2 rounded-lg uppercase text-white ${
                    isPaused ? "bg-blue-500" : "bg-orange-500"
                  } py-4 px-6 shadow-md hover:bg-orange-300 duration-300`}
                  onClick={handlePauseToggle}
                >
                  {isPaused ? (
                    <MaterialSymbolsPlayArrowOutline />
                  ) : (
                    <MaterialSymbolsPauseOutline />
                  )}
                  {isPaused ? "Continue" : "Pause"}
                </button>
                <button
                  className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
                  disabled={isFirstQuestion}
                  onClick={handlePreviousQuestion}
                >
                  <CarbonPreviousOutline />
                  Back
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
                    onClick={handleNextQuestion}
                  >
                    <CarbonNextOutline />
                    Next
                  </button>
                )}
              </div>
              {/* Question navigation buttons */}
              <div className="flex justify-center gap-3 mt-6">
                {exam.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
                   ${
                     currentQuestionIndex === index
                       ? "bg-blue-600 text-white shadow-lg transform scale-105"
                       : answers[index]?.length > 0
                       ? "bg-green-500 text-white shadow-md" // Mark answered questions green
                       : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black shadow-md"
                   }`}
                    onClick={() => handleJumpToQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {showOverlay && (
            <OverlayAlert
              title={`${isPaused ? "Continue" : "Pause"} exam`}
              description={`Are you sure you want to ${
                isPaused ? "continue" : "pause"
              } the exam?`}
              onConfirm={handleConfirmPause}
              onCancel={() => setShowOverlay(false)}
              confirmButtonColor={`${
                isPaused ? "bg-blue-400" : "bg-orange-400"
              }`}
              iconColor={`${isPaused ? "text-blue-400" : "text-orange-400"}`}
            />
          )}
        </div>
      )}
    </div>
  );
}
