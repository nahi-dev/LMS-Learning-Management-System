import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { assets } from "@/app/assets/assets";
import { AppContext } from "@/app/context/AppContext";
const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  return (
    <Link
      href={"course-detail/" + course._id}
      className="border border-r-gray-500/30 pb-4 overflow-hidden rounded-lg"
    >
      <div className="relative w-full h-40">
        <Image
          src={course.courseThumbnail}
          alt="courseThumbnail"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold"> {course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator.name}</p>
        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Image
                className="w-3.5 h-3.5"
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star "
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-500">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
