"use client";

import { useEffect, useState } from "react";
// components
import SharedHeader from "./components/shared-header";
import CreateProfile from "./components/create-profile";
import Login from "./components/login";

export default function Signin() {
  const [page, setPage] = useState(0)
  const navigatePage = () => {
      setPage(prevPage => prevPage === 0 ? 1 : 0)
  }

  useEffect(() => {
    console.log(page);
  }, [page])

  return (
    <main className="flex min-h-screen flex-col items-center p-6 font-customRegular md:justify-center md:bg-customLightGrey">
    <SharedHeader />
    {page === 0 ? <Login /> : <CreateProfile setDisplay={(x) => setPage(x)} />}
    <div className="flex flex-col items-center mt-5">
      <p className="text-customGrey">
        {page === 0 ? "Don't have an account?" : "Already have an account?"}
      </p>
      <a
        onClick={navigatePage}
        className="text-customPurple cursor-pointer active:text-customPurpleActive"
      >
        {page === 0 ? "Create an account" : "Login"}
      </a>
    </div>
  </main>
  );
}
