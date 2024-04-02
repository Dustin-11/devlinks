'use client';

import ShareUser from "@/app/components/share/share-user";
import ShareLinks from "@/app/components/share/share-links";
import { createContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const ShareDetailsContext = createContext();

export default function Shareable({ params }) {
    const [profile, setProfile] = useState({
        uid: '',
        firstName: '',
        lastName: '',
        email: '',
        photo: '',
        links: []
    });

    const getShareableData = async (uid) => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = docSnap.data();
            setProfile(prevDetails => ({
                ...prevDetails,
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                photo: data.photo || '',
                links: data.links || []
            }))
        } else {
            console.log('No data exists');
        }
    }

    useEffect(() => {
        getShareableData(params.uid);
        // console.log(params.uid);
    }, []);
    
    return(
        <div className="h-screen w-screen bg-customLightGrey">
            <div className="border-2 bg-customPurple fixed w-full h-2/5 z-10 rounded-b-[36px]"></div>
                <main id="scroll-Container" className="bg-customWhite h-[calc(100vh-110px)] w-8/12 fixed bottom-8 
                left-1/2 transform -translate-x-1/2 rounded-lg
                overflow-y-scroll md:bg-customWhite z-50 h-[800px] md:h-[535px] md:w-2/5 shadow-md md:top-1/4 
                flex justify-center md:rounded-3xl lg:w-1/3 xl:w-1/4">
                    <div className="w-full md:w-3/4 md:absolute md:z-50 md:pb-4">
                        <ShareDetailsContext.Provider value={{profile}}>
                            <ShareUser></ShareUser>
                            <ShareLinks></ShareLinks>
                        </ShareDetailsContext.Provider>
                    </div>
                </main>
            </div>
    )
}