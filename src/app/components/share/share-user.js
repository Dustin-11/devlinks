'use client';

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import DefaultProfileIcon from "../icons-customizable/default-profile";
import { ShareDetailsContext } from "@/app/preview/[uid]/page";

export default function ShareUser() {
    const { profile } = useContext(ShareDetailsContext);
    const [photo, setPhoto] = useState('');

    const fetchImage = async(x) => {
        try {
            const response = await fetch(x);
            const blob = await response.blob();
            const image = URL.createObjectURL(blob);
            setPhoto(image);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }

    useEffect(() => {
        if(profile.photo.length > 0) {
            fetchImage(profile.photo);
        }
    }, [profile.photo])

    // useEffect(() => {
    //     console.log(photo);
    // }, [photo])

    // useEffect(() => {
    //     fetchImage(profile.photo);
    // }, [profile])

    return(
        <div className="text-center">
         
            <div className={`relative h-[130px] w-[130px] mx-auto mt-16 border-4 border-customPurple rounded-full overflow-hidden flex align-center justify-center md:mt-8`}>
                {photo ? <Image src={photo} alt="ProfilePhoto" height={150} width={150} className="object-cover" /> :
                <div className="pt-4">
                    <DefaultProfileIcon />
                </div>}
            </div>
            
            {profile && (<><h1 className="mt-5 text-customLarge text-customDarkGrey font-bold md:mt-3">{`${profile.firstName} ${profile.lastName}`}</h1>
            <p className="mt-3 text-xs text-customGrey md:mt-2">{profile.email}</p></>)}
        </div>
    );
}