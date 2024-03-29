'use client'; 

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreviewHeader() {
    const [navigation, setNavigation] = useState();


    const handleClick = () => {
        setProfilePhoto(foo => foo + 1);
        console.log(profilePhoto);
    }

    //  Keeps track of which icon had focus -- account/profile -- and directs to that page upon click of 'BACK TO EDITOR' button
    useEffect(() => {
        const nav = localStorage.getItem('focus');
        setNavigation(nav);
    },[])

    return (
        <nav className="bg-customWhite w-full fixed top-0 md:z-10 md:bg-customWhite flex justify-center items-center gap-4
        md:w-[95%] md:left-1/2 md:transform md:-translate-x-1/2 md:justify-between md:rounded-xl md:top-4">
            <Link href={`/${navigation}`} className="mt-5 bg-customWhite border-1 border-customPurple 
            text-customPurple w-2/5 py-2 rounded-lg text-center md:w-1/5 md:ml-4 md:mb-4">Back to Editor</Link>
            <button className="mt-5 bg-customPurple text-customWhite w-2/5 py-2 rounded-lg md:w-1/5 md:mr-4 md:mb-4"
                    onClick={handleClick}>Share Link</button>
        </nav>
    );
}