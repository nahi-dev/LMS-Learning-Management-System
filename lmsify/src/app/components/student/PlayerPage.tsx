"use client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";
import humanizeDuration from "humanize-duration";
import { AppContext } from "@/app/context/AppContext";
import { useParams } from "next/navigation";
import YouTube from "react-youtube";
import Footer from "./Footer";
import Rating from "./Rating";
const PlayerPage = () => {
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { id } = useParams();
  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === id);
    if (course) {
      setCourseData(course);
    }
  };
  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  useEffect(() => {
    getCourseData();
  }, [enrolledCourses, id]);

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}
        <div className="text-grey-800">
          <h2>Course Structure</h2>
          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  >
                    <div className="flex  items-center gap-2">
                      <Image
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow_icon "
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-1 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 py-1 md:pl-8"
                        >
                          <Image
                            src={
                              false ? assets.blue_tick_icon : assets.play_icon
                            }
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex justify-between items-center w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: index + 1,
                                    })
                                  }
                                  className="text-blue-600 cursor-pointer"
                                >
                                  watch
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-2 py-3 mt-10 ">
            <h1 className="text-xl font-bold">Rate this course</h1>
            <Rating initialRating={0} onRate={(value) => console.log(value)} />
          </div>
        </div>
        {/* right column */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="text-blue-600 ">
                  {false ? "completed" : "mark complete"}
                </button>
              </div>
            </div>
          ) : courseData ? (
            <Image
              src={courseData.courseThumbnail}
              alt="Course Thumbnail"
              width={600}
              height={400}
              className="w-full h-auto rounded"
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlayerPage;
