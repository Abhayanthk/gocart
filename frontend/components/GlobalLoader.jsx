"use client";
import React, { useEffect, useState } from "react";

const GlobalLoader = ({ isLoading, progress }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setWidth(progress);
    } else {
      setWidth(100);
      const timer = setTimeout(() => {
        setWidth(0);
      }, 500); // Wait for the animation to finish before resetting
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  return (
    <div
      className={`fixed top-0 left-0 h-1 z-[9999] transition-all duration-300 ease-out ${
        width > 0 ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: "100%" }}
    >
      <div
        className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
        style={{
          width: `${width}%`,
          transition: "width 0.2s ease-out",
        }}
      />
    </div>
  );
};

export default GlobalLoader;
