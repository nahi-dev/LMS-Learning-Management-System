import React from "react";
import SearchBar from "./SearchBar";
const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full 
    md:pt-28 pt-20 px-7 md:px-0 text-center space-y-7 bg-gradient-to-b from-cyan-100/90"
    >
      <h1 className="md:text-4xl text-2xl font-bold text-gray-800 max-w-3xl mx-auto">
        Empower your future with the courses designed to{" "}
        <span className="text-blue-600">fit your choice.</span>
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        We bring together world-class instrctors, interactive content, and
        supportvive community to help you achieve your personal and professional
        goals.
      </p>
      <p className="md:hidden block text-gray-500 max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
