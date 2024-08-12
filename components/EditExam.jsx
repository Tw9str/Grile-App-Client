"use client";
import Notification from "@/components/widgets/Notification";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function EditExam({ exam, categories }) {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [messages, setMessages] = useState({ message: "", error: "" });
  const [examTitle, setExamTitle] = useState({ title: "", category: "" });
  const [questions, setQuestions] = useState([
    {
      image: null,
      imagePreview: null,
      answers: ["", "", "", ""],
      correctAnswers: [],
      explanation: "",
      points: "",
    },
  ]);
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    setExamTitle({ title: exam.title, category: exam.category });
    const parsedQuestions = exam.questions.map((q) => ({
      ...q,
      correctAnswers: q.correctAnswers.map((answer) => parseInt(answer, 10)),
      imagePreview: q.image
        ? `${process.env.NEXT_PUBLIC_API_BASE}/questions/${q.image}`
        : null, // Assuming images are stored in a specific directory
    }));
    setQuestions(parsedQuestions);
  }, [exam]);
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        image: null,
        imagePreview: null,
        answers: ["", "", "", ""],
        correctAnswers: [],
        explanation: "",
        points: "",
      },
    ]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "correctAnswers") {
      const currentIndex =
        updatedQuestions[index].correctAnswers.indexOf(value);
      if (currentIndex === -1) {
        updatedQuestions[index].correctAnswers.push(value);
      } else {
        updatedQuestions[index].correctAnswers.splice(currentIndex, 1);
      }
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleExplanationChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].explanation = value;
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    const filePreview = URL.createObjectURL(file);
    const updatedQuestions = [...questions];
    updatedQuestions[index].image = file;
    updatedQuestions[index].imagePreview = filePreview;
    setQuestions(updatedQuestions);
  };

  const validate = () => {
    const newErrors = {};
    if (!examTitle.title) newErrors.examTitle = "Exam title is required";
    if (!examTitle.category) newErrors.category = "Exam category is required";
    questions.forEach((question, qIndex) => {
      if (!question.image && !question.imagePreview)
        newErrors[`questionImage${qIndex}`] = "Image is required";
      question.answers.forEach((answer, aIndex) => {
        if (!answer)
          newErrors[`answer${qIndex}${aIndex}`] = "Answer is required";
      });
      if (question.correctAnswers.length === 0)
        newErrors[`correctAnswers${qIndex}`] =
          "At least one correct answer is required";
      if (!question.explanation)
        newErrors[`explanation${qIndex}`] = "Explanation is required";
      if (!question.points || isNaN(question.points) || question.points <= 0)
        newErrors[`points${qIndex}`] = "Points must be a positive number";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsNotificationOn(true);

    const formData = new FormData();
    formData.append("title", examTitle.title);
    formData.append("category", examTitle.category);
    formData.append("user", userId);

    questions.forEach((question, index) => {
      if (question.image instanceof File) {
        formData.append(`questionImage${index}`, question.image);
      }
    });

    formData.append(
      "questionsData",
      JSON.stringify(
        questions.map((q) => ({
          answers: q.answers,
          correctAnswers: q.correctAnswers,
          explanation: q.explanation,
          points: q.points,
          image: typeof q.image === "string" ? q.image : "",
        }))
      )
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/exam/edit/${exam._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages({ ...messages, message: data.message, error: "" });
      } else {
        console.error("Failed to update exam:", response.statusText);
        setMessages({ ...messages, message: data.message, error: "" });
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      setMessages({
        ...messages,
        message: "Error updating exam",
        error: error.message,
      });
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-8 mt-8 mx-auto bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Edit Exam</h1>
        <p className="text-sm text-gray-600">Edit exam details</p>
      </div>
      <form className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="examTitle" className="block text-sm text-gray-600">
              Exam Title
            </label>
            <input
              type="text"
              id="examTitle"
              value={examTitle.title}
              onChange={(e) =>
                setExamTitle({ ...examTitle, title: e.target.value })
              }
              placeholder="Exam Title"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
            {errors.examTitle && (
              <p className="text-red-500 text-sm">{errors.examTitle}</p>
            )}
            <label htmlFor="examTitle" className="block text-sm text-gray-600">
              Exam Category
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              type="text"
              name="category"
              id="category"
              autoComplete="category"
              required
              value={examTitle.category}
              onChange={(e) =>
                setExamTitle({ ...examTitle, category: e.target.value })
              }
            >
              <option value="" disabled>
                Choose category
              </option>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    className="text-secondary-900"
                    value={category._id}
                  >
                    {category.title.replace(/-/g, " ")}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="space-y-8">
              <div className="flex items-center gap-8">
                <label className="block mb-2 text-md font-bold text-gray-600">
                  Question {qIndex + 1}
                </label>
                <div>
                  <input
                    type="number"
                    min="0"
                    value={question.points}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIndex,
                        "points",
                        parseFloat(e.target.value)
                      )
                    }
                    placeholder="Points"
                    className="w-24 mb-2 px-3 py-2 border rounded-md focus:outline-green-500"
                  />
                  {errors[`points${qIndex}`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`points${qIndex}`]}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(qIndex, e)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                />
                {errors[`questionImage${qIndex}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`questionImage${qIndex}`]}
                  </p>
                )}
                {question.imagePreview && (
                  <div className="mt-2">
                    <Image
                      src={question.imagePreview}
                      alt={`Preview for question ${qIndex + 1}`}
                      width={1200}
                      height={1200}
                    />
                  </div>
                )}
              </div>
              {question.answers.map((answer, aIndex) => (
                <div key={aIndex} className="flex items-start">
                  <div className="w-full space-y-2">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(qIndex, aIndex, e.target.value)
                      }
                      placeholder={`Answer ${aIndex + 1}`}
                      className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                    />
                    {errors[`answer${qIndex}${aIndex}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`answer${qIndex}${aIndex}`]}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuestionChange(qIndex, "correctAnswers", aIndex)
                    }
                    className={`ml-4 py-2 px-4 rounded-full ${
                      question.correctAnswers.includes(aIndex)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {question.correctAnswers.includes(aIndex)
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              ))}
              {errors[`correctAnswers${qIndex}`] && (
                <p className="text-red-500 text-sm">
                  Please select at least one correct answer
                </p>
              )}
              <textarea
                value={question.explanation}
                onChange={(e) =>
                  handleExplanationChange(qIndex, e.target.value)
                }
                placeholder="Explanation"
                className="w-full h-48 px-3 py-2 border rounded-md focus:outline-green-500"
              ></textarea>
              {errors[`explanation${qIndex}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`explanation${qIndex}`]}
                </p>
              )}
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteQuestion(qIndex)}
                  className="text-white py-2 px-4 mt-4 font-semibold rounded-xl bg-red-500 hover:bg-red-400 duration-300"
                >
                  Delete Question
                </button>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={addQuestion}
            className="rounded-full text-white mb-8 font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full text-white ml-0 sm:ml-8 font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
      <Notification
        isNotificationOn={isNotificationOn}
        onNotificationClose={setIsNotificationOn}
        messages={messages}
      />
    </div>
  );
}
