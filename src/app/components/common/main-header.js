'use client';

import LinkIcon from "../icons-customizable/link-icon";
import PreviewIcon from "../../../../public/images/icon-preview-header.svg";
import ProfileIcon from "../icons-customizable/profile-icon";
import Image from "next/image";
import DevlinksIcon from "../../../../public/images/logo-devlinks-small.svg";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { UserDetailsContext } from "@/app/layout";
import { useContext, useEffect, useState } from "react";


export default function MainHeader() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [linksActive, setLinksActive] = useState(true);
    const [detailsActive, setDetailsActive] = useState(false);
    const router = useRouter();
    const signingOut = () => {
        console.log(auth);
        signOut(auth)
        .then(() => {
            console.log(auth);
            router.push('/');
            localStorage.clear();
            setUserDetails({
                uid: '',
                firstName: '',
                lastName: '',
                email: '',
                photo: '',
                links: []
            })
        })
        .catch((error) => {
            console.log('Error signing out', error);
        })
    }

    const navigate = (x) => {
        router.push(x);
    }

    const linksPageClick = () => {
        localStorage.setItem('focus', 'links');
    }

    const detailsPageClick = () => {
        localStorage.setItem('focus', 'user-details');
    }

    useEffect(() => {
        if(localStorage.getItem('focus') !== null) {
            const focusValue = localStorage.getItem('focus');
            if(focusValue === 'links') {
                setLinksActive(true);
                setDetailsActive(false);
            } else if (focusValue === 'user-details') {
                setLinksActive(false);
                setDetailsActive(true);
            }
        }
        else {
            localStorage.setItem('focus', 'links');
        }
    }, [])

    return (
        <nav className="bg-customWhite flex justify-between align-center w-full px-6 py-4 fixed top-0">
            <div className="md:flex md:gap-2 md:items-center">
            <Image
                src={DevlinksIcon}
                alt="Devlinks Icon"
                className="hover:cursor-pointer"
                onClick={signingOut}>
            </Image>
            <span className="hidden md:block text-2xl font-bold">devlinks</span>
            </div>
            
            <div className="flex gap-2">
                <a onClick={() => {linksPageClick(); navigate('/links')}} className={`flex items-center px-6 py-2 rounded-lg hover:cursor-pointer
                                                    ${linksActive ? 'bg-customLightPurple' : ''} `}>
                    <LinkIcon colorFlag={linksActive}/>
                    <span className={`hidden ml-2 md:block ${linksActive ? 'text-customPurple font-bold' : ''}`}>Links</span>
                </a>
                <a onClick={() => {detailsPageClick(); navigate('/user-details')}} className={`flex items-center px-6 py-2 hover:cursor-pointer rounded-lg focus:bg-customLightPurple focus:outline-none
                                                                                                                       ${detailsActive ? 'bg-customLightPurple' : ''}`}>
                    <ProfileIcon colorFlag={detailsActive} />
                    <span className={`hidden ml-2 md:block ${detailsActive ? 'text-customPurple font-bold' : ''}`}>Profile Details</span>
                </a>
            </div>
            <Link href="/preview" className="flex items-center px-3 py-2 rounded-lg hover:cursor-pointer focus:bg-customLightPurple border-1 border-customPurple md:px-6">
                <Image
                    src={PreviewIcon}
                    alt="Profile Preview Icon"
                    className="md:hidden">
                </Image>
                <span className="hidden md:block text-customPurple font-bold text-sm">Preview</span>
            </Link>
        </nav>
    );
}