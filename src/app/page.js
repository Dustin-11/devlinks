"use client";

import { useEffect, useState } from "react";
// components
import AuthHeader from "./components/auth/auth-header";
import CreateProfile from "./components/auth/create-profile";
import Login from "./components/auth/login";

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
    <AuthHeader />
    {page === 0 ? <Login /> : <CreateProfile setDisplay={(x) => setPage(x)} />}
    <div className="flex flex-col items-center mt-5 md:flex-row md:gap-4">
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
