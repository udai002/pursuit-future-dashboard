import React, { useEffect, useState } from "react";
import wmImg from "../assets/logo.png";

export default function Watermark({
  opacity = 0.1,
  rotate = -20,
  text = "Pursuit Future Technology"
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src={wmImg}
          alt="wm"
          className="w-[400px] h-[400px]"
          style={{ opacity: 1 }}
        />
      </div>

      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute text-gray-400 text-center font-semibold"
            style={{
              top: `${row * 25 + 5}%`,
              left: `${col * 25 + 5}%`,
              transform: `rotate(${rotate}deg)`,
              opacity: opacity,
              userSelect: "none",
            }}
          >
            <div className="text-xl ">{text}</div>
            <div className="text-sm">{formattedTime}</div>
          </div>
        ))
      )}
    </div>
  );
}
