"use client";
import React, { useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { assets, dummyDashboardData } from "../assets/assets";
import Loading from "../components/student/Loading";
import Image from "next/image";
const EducatorDashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <Image
              src={assets.patients_icon}
              width={24}
              height={24}
              alt="patient_icon"
            />
            <div className="flex flex-col">
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-gray-500 ">Total Enrollments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <Image
              src={assets.appointments_icon}
              width={24}
              height={24}
              alt="app_icon"
            />
            <div className="flex flex-col">
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>
              <p className="text-gray-500 ">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <Image
              src={assets.earning_icon}
              width={24}
              height={24}
              alt="earning_icon"
            />
            <div className="flex flex-col">
              <p className="text-2xl font-medium text-gray-600">
                {currency} {dashboardData.totalEarnings}
              </p>
              <p className="text-gray-500 ">Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="pb-4 text-lg font-medium ">Latest Enrollment</h2>
          <div className="flex flex-col w-full items-center overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className=" border-b border-gray-500/20 ">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="md:px-4 py-3 flex items-center gap-3">
                      <Image
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                        width={36}
                        height={36}
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default EducatorDashboard;
