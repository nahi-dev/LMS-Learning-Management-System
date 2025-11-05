"use client";
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/nextjs";
export const AppContext = createContext(null);
export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // This is for the backend
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  // Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };
  // Functiion to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };
  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };
  // Calculate number of lectures in a course
  const calculateNumberOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.map((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);
  // This is still for the backend
  const logToken = async () => {
    try {
      console.log("Fetching token...");
      const token = await getToken();
      console.log("Token fetched:", token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    console.log("Effect triggered. User:", user);
    if (isLoaded && user) {
      logToken();
    }
  }, [isLoaded, user]);
  const value = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNumberOfLectures,
    calculateChapterTime,
    calculateCourseDuration,
    humanizeDuration,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
