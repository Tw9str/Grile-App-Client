"use client";
import { useState } from "react";

export default function ExamForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", question);
    formData.append("options", JSON.stringify(options));
    formData.append("correctAnswer", correctAnswer);
    if (image) formData.append("image", image);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/add-question`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      alert("Question added successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <label>Option {index + 1}</label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}
      <div>
        <label>Correct Answer</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      <div>
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button type="submit">Upload Question</button>
    </form>
  );
}
