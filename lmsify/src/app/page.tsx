import React from "react";
import Hero from "./components/student/Hero";

import Footer from "./components/student/Footer";
import Companies from "./components/student/companies";
import CourseSection from "./components/student/CourseSection";
import Testimonial from "./components/student/Testimonial";
import CallToAction from "./components/student/CallToAction";
// import DebugRole from "./components/student/test";
const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <Companies />
      <CourseSection />
      <Testimonial />
      <CallToAction />
      {/* <DebugRole /> */}
      <Footer />
    </div>
  );
};

export default Home;
