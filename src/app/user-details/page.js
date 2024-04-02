'use client';

import { useEffect, useState } from "react";
import PhoneIllustration from "../components/common/phone-illustration";
import MainHeader from "../components/common/main-header";
import ProfilePhoto from "../components/user-details/profile-photo";
import ProfileUser from "../components/user-details/profile-user";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";

export default function Profile () {
    const [disabled, setDisabled] = useState(true);
    const [photoTrigger, setPhotoTrigger] = useState(false);
    const [userTrigger, setUserTrigger] = useState(false);
    const [photoChanged, setPhotoChanged] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [nameRequirementsMet, setNameRequirementsMet] = useState(false);
    const [initialNamesReq, setInitialNamesReq] = useState(false);
    
    useEffect(() => {
        if(!auth.currentUser){
            redirect('/');
        }
    }, [])

    //  Triggered on save button click
    //  Reads each child component property and affects as needed
    //  Sets disabled state back to true
    const profileUserFlag = async () => {
        if(nameRequirementsMet) {
            await setUserTrigger(true);
        }
        if(photoChanged) {
            await setPhotoTrigger(true);
        }
        setDisabled(true);
        setUserTrigger(false);
        setPhotoTrigger(false);
    };

    //  Figure out how to update save button disabled value when just email value is changed
    useEffect(() => {
        console.log('Triggered:', emailChanged);
        if(emailChanged) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [emailChanged])

    //  Monitors photoChanged and nameRequirementsMet in order to change disabled state to affect button
    useEffect(() => {
        if(photoChanged == true && nameRequirementsMet == true) {
            setDisabled(false);
        } else if(nameRequirementsMet) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [photoChanged, nameRequirementsMet]);

    //  This was originally used to tell if the initial values loaded from database met length requirements
    //  That idea is on the backburner and we are okay with the initial save button upon load being able to be clicked
    useEffect(() => {
        if(photoChanged) {  // && initialNamesReq
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [photoChanged])

    //  Makes initial button disabled
    useEffect(() => {
            setDisabled(true);
    }, [])

    return(
        <div className="bg-customLightGrey h-screen w-screen">
            <MainHeader />
            <div className="xl:flex xl:justify-between xl:pt-20 xl:h-full xl:gap-4">
                <div className="invisible xl:visible xl:bg-white xl:w-2/5 xl:flex 
                                xl:justify-center xl:items-center xl:ml-2 xl:mb-2 xl:rounded-xl"> 
                    <PhoneIllustration></PhoneIllustration>
                </div>
                <div className="xl:relative xl:w-3/5 xl:mb-2 xl:mr-2 xl:rounded-xl">
                    <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
                                     left-1/2 transform -translate-x-1/2 rounded-lg
                                     overflow-hidden xl:w-full xl:absolute xl:h-full xl:bottom-0">
                        <div className="h-[92%] overflow-y-auto xl:overflow-hidden">
                            <ProfilePhoto setDidPhotoChange={(bool) => setPhotoChanged(bool)}
                                          trigger={photoTrigger}></ProfilePhoto>
                            <ProfileUser nameRequirements={(bool) => setNameRequirementsMet(bool)}
                                         isInitialNames={(bool) => setInitialNamesReq(bool)}
                                         emailNotification={(bool) => setEmailChanged(bool)}
                                         trigger={userTrigger}></ProfileUser>
                        </div>
                    </main>
                    <div className="absolute bottom-0 w-full pb-5 bg-customWhite xl:w-full xl:mt-4">
                        <div className="border-b border-customBorders"></div>
                        <div className="px-5 xl:flex xl:justify-end xl:mr-5">
                            <button className="mt-5 bg-customPurple text-customWhite w-full font-bold py-2 rounded-lg hover:cursor-pointer
                            disabled:bg-customLightPurple xl:w-16"
                                    disabled={disabled} onClick={profileUserFlag}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}