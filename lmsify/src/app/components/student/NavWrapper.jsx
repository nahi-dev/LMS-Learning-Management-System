"use client";
import Navbar from "../student/Navbar";
import { usePathname } from "next/navigation";
// to use the navbar only for the student
const NavWrapper = () => {
  const pathname = usePathname();
  const isEducatorRoute = pathname.startsWith("/educator");
  return <div>{!isEducatorRoute && <Navbar />}</div>;
};

export default NavWrapper;
