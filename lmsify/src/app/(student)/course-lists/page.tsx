"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/app/components/student/SearchBar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/AppContext";
import CourseCard from "@/app/components/student/CourseCard";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import Footer from "@/app/components/student/Footer";
export default function CourseListPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const { allCourses } = useContext(AppContext);
  const [filteredCourse, setFilteredCourse] = useState();
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      searchTerm
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, searchTerm]);
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left ">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full ">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span className="text-blue-600">
                <Link href={"/"}>Home</Link>
              </span>{" "}
              /{" "}
              <span>
                <Link href={"/"}>course List</Link>
              </span>
            </p>
          </div>
          <SearchBar data={searchTerm} />
        </div>
        {searchTerm && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{searchTerm}</p>
            <Link href={"/course-lists"}>
              <Image src={assets.cross_icon} alt="" />
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse?.map((course, index) => (
            // <Link href={"/"}>
            <CourseCard key={index} course={course} />
            // </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
