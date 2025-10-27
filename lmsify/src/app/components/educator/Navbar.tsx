"use client";
import React from "react";

import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { assets, dummyEducatorData } from "@/app/assets/assets";

import Image from "next/image";
const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-blue-600 rounded-2xl p-2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21"
            />
          </svg>
        </div>
        <span className="font-bold text-xl text-black  sm:block">LMSify</span>
      </Link>
      <div className="flex items-center gap-5 text-gray-700">
        <p>Hi! {user ? user.fullName : "Developers"}</p>
        {user ? (
          <UserButton />
        ) : (
          <Image src={assets.profile_img} alt="profile" className="max-w-8" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
