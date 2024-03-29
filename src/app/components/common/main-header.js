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
import { useContext, useEffect, useRef, useState } from "react";


export default function MainHeader() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [linksActive, setLinksActive] = useState(true);
    const [detailsActive, setDetailsActive] = useState(false);
    // const linksRef = useRef(true);
    // const detailsRef = useRef(false);
    const router = useRouter();
    const signingOut = () => {
        signOut(auth)
        .then(() => {
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

    const handleClick1 = () => {
        localStorage.setItem('focus', 'links'); 
    }

    const handleClick2 = () => {
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
    }, [])

    return (
        <nav className="bg-customWhite flex justify-between align-center w-full px-6 py-4 fixed top-0">
            <Image
                src={DevlinksIcon}
                alt="Devlinks Icon"
                className=""
                onClick={signingOut}>
            </Image>
            
            <div className="flex gap-2">
                <a onClick={() => {handleClick1(); navigate('/links')}} className={`flex align-center px-6 py-2 rounded-lg 
                                                    ${linksActive ? 'bg-customLightPurple' : ''} `}>
                    <LinkIcon colorFlag={linksActive}/>
                </a>
                <a onClick={() => {handleClick2(); navigate('/user-details')}} className={`flex align-center px-6 py-2 rounded-lg focus:bg-customLightPurple focus:outline-none
                                                                                                                       ${detailsActive ? 'bg-customLightPurple' : ''}`}>
                    <ProfileIcon colorFlag={detailsActive} />
                </a>
            </div>
            <Link href="/preview" className="flex align-center px-3 py-2 rounded-lg focus:bg-customLightPurple border-1 border-customPurple">
                <Image
                    src={PreviewIcon}
                    alt="Profile Preview Icon">
                </Image>
            </Link>
        </nav>
    );
}