"use client";
import React from "react";
import Link from "next/link";
import CourseCard from "./CourseCard";
import { AppContext } from "@/app/context/AppContext";
import { useContext } from "react";

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding an
        design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  px-4 md:px-0 md:my-16 my-10 w-fit mx-auto gap-8">
        {allCourses?.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      <Link
        href="/course-lists"
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CourseSection;
