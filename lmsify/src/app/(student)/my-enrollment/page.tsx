"use client";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { Line } from "rc-progress";
import Footer from "@/app/components/student/Footer";
const MyEnrollment = () => {
  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 7, totalLectures: 12 },
    { lectureCompleted: 5, totalLectures: 13 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 6, totalLectures: 10 },
  ]);
  return (
    <>
      <div className="md:px-36 px-8 pt-10 mb-16">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead>
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate max-sm:hidden">
                Duration
              </th>
              <th className="px-4 py-3 font-semibold truncate max-sm:hidden">
                Completed
              </th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <Image
                    src={course.courseThumbnail}
                    alt=""
                    width={112} // Tailwind w-28 = 7rem = 112px
                    height={80}
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        (progressArray[index]?.lectureCompleted /
                          progressArray[index]?.totalLectures) *
                        100
                      }
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted}/ ${progressArray[index].totalLectures}`}{" "}
                  <span>Lectures</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <Link href={"player/" + course._id}>
                    <button
                      className="px-3 sm:px-5 py-1.5 sm:py-2
                    bg-blue-600 max-sm:text-xs
                    text-white rounded-xl "
                    >
                      {progressArray[index] &&
                      progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures ===
                        1
                        ? "Completed"
                        : "In Progress"}
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollment;
