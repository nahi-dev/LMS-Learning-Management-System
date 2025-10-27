"use client";
import React, { FormEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
interface SearchbarProps {
  data?: any;
}
const SearchBar: React.FC<SearchbarProps> = ({ data }) => {
  const router = useRouter();
  const [input, setInput] = useState(data || "");
  const onSearchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/course-lists?search=${input}`);
  };
  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <MdSearch className="  md:text-6xl px-3" />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-800"
      />
      <button
        type="submit"
        className="bg-blue-500 rounded md:px-10 px-7 md:py-3 py-2 mx-1"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
