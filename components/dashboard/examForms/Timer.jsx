"use client";
import React, { useState, useEffect } from "react";
import { MaterialSymbolsTimerOutline } from "./Icons";

export default function Timer({ initialTime, isPaused, onTimeChange }) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        onTimeChange(newTime);
        if (newTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeChange]);

  const formatTime = (time) => String(time).padStart(2, "0");

  return (
    <div className="flex justify-around items-center gap-2">
      <MaterialSymbolsTimerOutline />
      <div>
        {formatTime(Math.floor(timeRemaining / 3600))}:
        {formatTime(Math.floor((timeRemaining % 3600) / 60))}:
        {formatTime(timeRemaining % 60)}
      </div>
    </div>
  );
}
