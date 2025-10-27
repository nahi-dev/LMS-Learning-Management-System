"use client";
import { assets } from "@/app/assets/assets";
import { AppContext } from "@/app/context/AppContext";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 min-h-screen border-r text-base border-gray-500 py-2 flex flex-col">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 transition-all ${
                isActive
                  ? "bg-indigo-50 border-r-[6px] border-indigo-500"
                  : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-300/90"
              }`}
            >
              <Image src={item.icon} alt="" className="w-6 h-6" />
              <p className="hidden md:block">{item.name}</p>
            </Link>
          );
        })}
      </div>
    )
  );
};

export default Sidebar;
