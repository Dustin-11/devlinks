'use client';

//  icons
import GitHub from '../../../../public/images/icon-github.svg';
import Frontend from '../../../../public/images/icon-frontend-mentor.svg';
import Twitter from '../../../../public/images/icon-twitter.svg';
import LinkedIn from '../../../../public/images/icon-linkedin.svg';
import YouTube from '../../../../public/images/icon-youtube.svg';
import Facebook from '../../../../public/images/icon-facebook.svg';
import Twitch from '../../../../public/images/icon-twitch.svg';
import Dev from '../../../../public/images/icon-devto.svg';
import CodeWars from '../../../../public/images/icon-codewars.svg';
import CodePen from '../../../../public/images/icon-codepen.svg';
import freeCC from '../../../../public/images/icon-freecodecamp.svg';
import GitLab from '../../../../public/images/icon-gitlab.svg';
import Hash from '../../../../public/images/icon-hashnode.svg';
import Stack from '../../../../public/images/icon-stack-overflow.svg';
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function PlatformOptions({ handleOptionSelection, selection }) {
    
    //  Controls droplist display
    const [displayOptions, setDisplayOptions] = useState(false);

    //  Value being displayed when droplist is closed
    const [selectedOption, setSelectedOption] = useState('Select an option');

    const platforms = [
        {name: 'Github', urlPath: GitHub},
        {name: 'Frontend Mentor', urlPath: Frontend},
        {name: 'Twitter', urlPath: Twitter},
        {name: 'LinkedIn', urlPath: LinkedIn},
        {name: 'Youtube', urlPath: YouTube},
        {name: 'Facebook', urlPath: Facebook},
        {name: 'Twitch', urlPath: Twitch},
        {name: 'Dev', urlPath: Dev},
        {name: 'CodeWars', urlPath: CodeWars},
        {name: 'CodePen', urlPath: CodePen},
        {name: 'freeCC', urlPath: freeCC},
        {name: 'GitLab', urlPath: GitLab},
        {name: 'Hash', urlPath: Hash},
        {name: 'Stack', urlPath: Stack}
    ]

    const optionsClick = (platformName) => {
        if (displayOptions) {
            setSelectedOption(platformName);
            handleOptionSelection(platformName);
        }
        setDisplayOptions(!displayOptions);
    }

    //  
    useEffect(() => {
        if(selection) {
            setSelectedOption(selection);
            handleOptionSelection(selection);
        }
        
    }, [])

    return(
        <>
        <div className="bg-customWhite absolute w-full py-2 rounded-lg border-customBorders border-1"
                >
            <div className='text-left pl-2'
                 onClick={optionsClick}>
                 
                {!displayOptions && (<span>{selectedOption}</span>)}
            </div>
            <ul className='text-customDarkGrey z-5 bg-white'>
                {displayOptions && (platforms.map(platform => (
                    <li className="flex gap-4 hover:bg-customBorders py-2"
                        onClick={() => optionsClick(platform.name)}
                        key={platform.name}>
                        {platform.urlPath && (<Image src={platform.urlPath} alt='Platform Icon'></Image>)}
                        <span className='active:text-customPurple'>{platform.name}</span>
                    </li>
                )))}
            </ul>
        </div>
        </>
    );
}