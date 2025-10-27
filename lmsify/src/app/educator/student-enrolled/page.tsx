"use client";
import React, { useState, useEffect } from "react";
import { dummyStudentEnrolled } from "@/app/assets/assets";
import Loading from "@/app/components/student/Loading";
import Image from "next/image";
const StudentEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };
  useEffect(() => {
    fetchEnrolledStudents();
  }, []);
  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="md:table-auto table-fixed overflow-hidden w-full pb-4">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                #
              </th>
              <th className="px-4 py-3 font-semibold ">Student Name</th>
              <th className="px-4 py-3 font-semibold ">Course Title</th>
              <th className="px-4 py-3 font-semibold  hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {index + 1}
                </td>
                <td className="flex md:px-4 px-2 py-3 items-center gap-3">
                  <Image
                    src={item.student.imageUrl}
                    width={32}
                    height={32}
                    alt="profile"
                    className="rounded-full"
                  />
                  <span className="truncate">{item.student.name}</span>
                </td>
                <td className="truncate py-4 px-4">{item.courseTitle}</td>
                <td className="truncate py-4 px-4">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentEnrolled;
