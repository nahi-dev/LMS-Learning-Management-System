import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();
  const { isEducator, setIsEducator } = useContext(AppContext);
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle sign in with mobile menu close
  const handleSignIn = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      openSignIn();
    }, 100);
  };

  // Fix for background gradient conflict
  const navBackground = isScrolled
    ? "bg-white shadow-md py-2"
    : "bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 py-4";

  return (
    <nav
      className={` top-0 left-0 right-0 z-50 border-b transition-all py-4 duration-300 bg-cyan-100/70`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-36 max-w-7xl mx-auto">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {user && (
            <>
              <Link
                href="/my-enrollment"
                className={`transition-colors duration-200 hover:text-blue-600 ${
                  pathname === "/student/my-enrollment"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700"
                }`}
              >
                My Enrollments
              </Link>

              <Link
                href="/educator"
                className="text-gray-700 hover:to-blue-500 transition-colors duration-200"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </Link>
            </>
          )}

          {/* Show UserButton or Create Account based on auth status */}
          {isLoaded &&
            (user ? (
              <UserButton />
            ) : (
              <button
                onClick={() => openSignIn()}
                className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Create Account
              </button>
            ))}
        </div>

        {/* Mobile menu button - Show UserButton if logged in, otherwise hamburger menu */}
        <div className="md:hidden flex items-center">
          {isLoaded && user ? (
            <div className="flex items-center space-x-4">
              <UserButton />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
                type="button"
              >
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              type="button"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {user && (
              <>
                <Link
                  href="/my-enrollment"
                  className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                    pathname === "/student/my-enrollment"
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  My Enrollments
                </Link>

                <Link
                  href="/educator"
                  className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  {isEducator ? "Educator Dashboard" : "Become Educator"}
                </Link>
              </>
            )}

            {!user && (
              <button
                onClick={handleSignIn}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium mt-2"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
