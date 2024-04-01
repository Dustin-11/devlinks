'use client';

import { useState, useEffect, useRef } from "react";
import PlatformOptions from "./platform-options";
import Image from "next/image";
import Icon from "../../../../public/images/icon-drag-and-drop.svg"

export default function LinkCard({index, item, onDragOver, moveLinkCard, selectedPlatform, 
                                  deleteLinkCard, updateList, urlAddress }) {
    const [option, setOption] = useState('');
    const [url, setUrl] = useState('');
    const [cardDetails, setCardDetails] = useState({name: '', link: '', indexNumber: index, id: item.id});
    const [isUrlValid, setIsUrlValid] = useState(true);


    // useEffect(() => {
    //     const pattern = /^(ftp|http|https):\/\/[^ "]+\.[^ "]+$/;
    //     setIsUrlValid(pattern.test(url));
    // }, [url])

    const handleDragStart = () => {
        moveLinkCard(index);
    }

    const handleDragEnd = () => {
        moveLinkCard(null);
    }

    //  Keeps specific LinkCard details up to date locally based on user changes

    useEffect(() => {
        setCardDetails(prevState => ({
            ...prevState,
            name: option,
            link: url
        }));
    }, [option, url]);

    //  Sets UI to reflect saved urlAddress on first render
    useEffect(() => {
        setUrl(urlAddress);
    }, [])

    //  Lifts changes stored locally to AddLink component
    useEffect(() => {
        updateList(cardDetails);
    }, [cardDetails]);

    return(
        <div draggable id={`item-${index}`} className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5 cursor-grab mt-10"
             onDragStart={(e) => handleDragStart(e)}
             onDragOver={(e) => onDragOver(e, index)}
             onDragEnd={handleDragEnd}>
            <div className="flex justify-between text-customGrey">
                <div className="flex gap-4">
                    <Image src={Icon} className="hover:pointer"
                           alt="Drag and Drop Icon"/>
                    <h1 className="font-bold">{`Link # ${index + 1}`}</h1>
                </div>
                <button className="hover:pointer" onClick={() => deleteLinkCard(item.id)}>Remove</button>
            </div>
            <div className="relative">
                <label className="block my-1 mt-5 text-customDarkGrey text-xs">Platform</label>
                <PlatformOptions handleOptionSelection={(option) => setOption(option)}
                                 selection={selectedPlatform}></PlatformOptions>
                <label className="block my-1 mt-16 block text-xs">Link</label>
                <input type="text" placeholder="e.g. https://www.github.com/"
                       onChange={(e) => setUrl(e.target.value)}
                       value={url}
                       className={`block w-full py-2 pl-2 rounded-lg border-customBorders border-1 outline-none ${isUrlValid ? "" : "border-red-500"}`}></input>
            </div>
        </div>
);
}