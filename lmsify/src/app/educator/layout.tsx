import React from "react";
import Navbar from "../components/educator/Navbar";
import Sidebar from "../components/educator/Sidebar";
import Footer from "../components/educator/Footer";
import "quill/dist/quill.snow.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="text-default min-h-screen bg-white">
        <Navbar />
        <div className="flex">
          <Sidebar />

          <main className="flex-1">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
