import React from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <Image
          src={assets.logo}
          className="hidden md:block w-20 h-20"
          alt="logo"
        />
        <div className="hidden md:block h-7 w-px bg-gray-500/60 "></div>
        <p>Copyright 2025 @ LMSify. All Right Reserved</p>
      </div>
      <div className="flex items-center gap-4 max-md:mt-4">
        <Link href="#">
          <Image src={assets.facebook_icon} alt="Facebook" />
        </Link>
        <Link href="#">
          <Image src={assets.twitter_icon} alt="Twitter" />
        </Link>
        <Link href="#">
          <Image src={assets.instagram_icon} alt="Instagram" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
