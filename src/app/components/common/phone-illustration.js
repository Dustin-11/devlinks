'use client';

import { useState, useEffect, useContext } from "react";
import { UserDetailsContext } from "@/app/layout";

//  Platform Icons
import CodePen from "../icons-customizable/codepen";
import CodeWars from "../icons-customizable/codewars";
import DevTo from "../icons-customizable/dev";
import Facebook from "../icons-customizable/facebook";
import FreeCodeCamp from "../icons-customizable/freecodecamp";
import FrontendMentor from "../icons-customizable/frontend-mentor";
import Github from "../icons-customizable/github";
import GitLab from "../icons-customizable/gitlab";
import HashNode from "../icons-customizable/hash";
import LinkedIn from "../icons-customizable/linkedin";
import StackOverflow from "../icons-customizable/stackoverflow";
import Twitch from "../icons-customizable/twitch";
import Twitter from "../icons-customizable/twitter";
import Youtube from "../icons-customizable/youtube";
import DefaultProfileIcon from "../icons-customizable/default-profile";

export default function PhoneIllustration() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [yValue, setYValue] = useState(278);
    const [arrowY, setArrowY] = useState(292);
    const [ textY ] = useState(307);
    const [links, setLinks] = useState([]);
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState();
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    //  key : value object that hold all the display information for each platform
    const platforms = {
        'Github': { component: Github, color: '#1A1A1A', text: '#FFFFFF', border: '#00000000'},
        'Frontend Mentor': { component: FrontendMentor, color: '#FFFFFF', text: '#1A1A1A', border: '#D9D9D9'},
        'LinkedIn': { component: LinkedIn, color: '#2D68FF', text: '#FFFFFF', border: '#00000000'},
        'Youtube': { component: Youtube, color: '#EE3939', text: '#FFFFFF', border: '#00000000'},
        'Facebook': { component: Facebook, color: '#2442AC', text: '#FFFFFF', border: '#00000000'},
        'Twitch': { component: Twitch, color: '#EE3FC8', text: '#FFFFFF', border: '#00000000'},
        'Dev': { component: DevTo, color: '#333333', text: '#FFFFFF', border: '#00000000'},
        'CodeWars': { component: CodeWars, color: '#8A1A50', text: '#FFFFFF', border: '#00000000'},
        'CodePen': { component: CodePen, color: '#AC8E24', text: '#FFFFFF', border: '#00000000'},
        'freeCC': { component: FreeCodeCamp, color: '#302267', text: '#FFFFFF', border: '#00000000'},
        'GitLab': { component: GitLab, color: '#EB4925', text: '#FFFFFF', border: '#00000000'},
        'Hash': { component: HashNode, color: '#0330D1', text: '#FFFFFF', border: '#00000000'},
        'Stack': { component: StackOverflow, color: '#EC7100', text: '#FFFFFF', border: '#00000000'},
        'Twitter': { component: Twitter, color: '#43B7E9', text: '#FFFFFF', border: '#00000000'},
    }

    //  Gets any information saved in userDetails and stores it locally within component
    useEffect(() => {
        if(userDetails.firstName.length > 1) {
            setFirstName(userDetails.firstName);
        }
        if(userDetails.lastName.length > 1) {
            setLastName(userDetails.lastName);
        }
        if(userDetails.email.length > 1) {
            setEmail(userDetails.email);
        }
        if(userDetails.links) {
            const newList = userDetails.links.slice(0,5);
            setLinks(newList);
        }
    }, [userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.links])

    useEffect(() => {
        const fetchImage = async() => {
            try {
                const response = await fetch(userDetails.photo);
                const blob = await response.blob();
                const image = URL.createObjectURL(blob);
                setPhoto(image);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        }
        if (userDetails.photo.length > 0) {
        fetchImage();
        }
    }, [userDetails.photo])

    useEffect(() => {
        console.log(photo);
    }, [photo])
    
    //  SVG for arrow icon
    function Arrow({ x, y, fill }) {
        return(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EEE" x={x} y={y} viewBox="0 0 16 16">
                        <path fill={fill} d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/>
                </svg> 
            );
    }

    //  SVG for default icon in case link.name doesn't match any value stores in platforms object
    const DefaultPlatformIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="#000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
            </svg>
        );
    };

    return(
        <div className="z-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
                <path stroke="#737373" d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"/>
                <path fill="#fff" stroke="#737373" d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"/>
                <defs>
                    <clipPath id="circleClip">
                        <circle cx="153.5" cy="112" r="48"/>
                    </clipPath>
                </defs>
                {photo ? <image
                    x="105.5"
                    y="64"
                    width="96"
                    height="96"
                    preserveAspectRatio="xMidYMid slice"
                    xlinkHref={photo}
                    clipPath="url(#circleClip)"
                /> : <DefaultProfileIcon /> }

                {/* Controls display for user information */}
                {firstName || lastName ? 
                (<text x="154" y="199" fontFamily="Arial" fontSize="16" fill="#000000" textAnchor="middle">
                    {firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName)}
                </text>) : 
                (<rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />)}

                {email ? (<text x="154" y="220" fontFamily="Arial" fontSize="12" fill="#000000" textAnchor="middle">
                    {email} 
                </text>) :
                (<rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4"/>)}

                {/* Controls display for links */}
                {links && (links.map((link, index) => {
                    //  Value for link container vertical alignment
                    const newY = yValue + index * 64;
                    //  Value for Icons vertical alignment
                    const newIconY = arrowY + index * 64;
                    //  Value for Text vertical alignment
                    const newTextY = textY + index * 64;
                    const PlatformIcon = platforms[link.name].component || DefaultPlatformIcon;
                    const platformColor = platforms[link.name].color;
                    const textColor = platforms[link.name].text;
                    const borderColor = platforms[link.name].border
                    return(
                    <g key={index}>
                        <rect width="237" height="44" x="35" y={newY} fill={platformColor} rx="8" stroke={borderColor} strokeWidth="1"></rect>
                        <text x="80" y={newTextY} fontFamily="Arial" fontSize="15" fill={textColor}>{link.name}</text>
                        <PlatformIcon x={50} y={newIconY} fill={textColor}/>
                        <Arrow x={247} y={newIconY} fill={textColor} />
                          </g>)
                    }))}
            </svg>
        </div>
    );
}

