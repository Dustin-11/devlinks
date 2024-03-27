"use client";

import { useState } from "react";
// components
import SharedHeader from "./components/shared-header";
import CreateProfile from "./components/create-profile";
import Login from "./components/login";

export default function Signin() {
  const [page, setPage] = useState(0)
  const navigatePage = () => {
      if(page != 1) {
          setPage(1);
      }
      else {
          setPage(0);
      }
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-6 font-customRegular 
    md:justify-center md:bg-customLightGrey">
      <SharedHeader></SharedHeader>
            {page ? <CreateProfile></CreateProfile>:<Login></Login>}
            
                {page ? 
                    <div className="flex flex-col items-center mt-5">
                        <p className="text-customGrey">Already have an account?</p>
                        <a onClick={navigatePage} className="text-customPurple cursor-pointer active:text-customPurpleActive">Login</a>
                    </div> 
                    : 
                    <div className="flex flex-col items-center mt-5">
                        <p className="text-customGrey">Dont have an account?</p>
                        <a onClick={navigatePage} className="text-customPurple">Create an account</a>
                    </div>
                }
    </main>
  );
}
