'use client';

import Image from "next/image";
import PhoneIcon from "../../../../public/images/illustration-empty.svg"
import { useContext, useEffect, useState, useRef, useMemo, useLayoutEffect } from "react";
import LinkCard from "./link-card";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserDetailsContext } from "@/app/layout";

export default function AddLink() {

    //  components

    // List of link-card objects -- allows for deleting and resorting
    const [listOfLinks, setListOfLinks] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    // Handles if the instruction or link-card is displayed
    const [displayLinks, setDisplayLinks] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [flag, setFlag] = useState(false);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const dragIndexRef = useRef();
    const scrollContainerRef = useRef();
    const scrollPositionRef = useRef();
    const memoizedListOfLinks = useMemo(() => listOfLinks, [listOfLinks]);

    const addNewLink = () => {
        setDisplayLinks(true);
        const newCardDetails = {
            name: '',
            link: '',
            indexNumber: listOfLinks.length,
            id: Date.now()
        }
        setListOfLinks(prevState => ([...prevState, newCardDetails]))
    };

    //  Takes individual LinkCard that has been changed as parameter
    //  Iterates through listOfLinks array  --  finds LinkCard.id that === item.id in listOfLinks and updates it
    const handleCardUpdate = (card) => {
        setListOfLinks(prevList => {
            const updatedList = prevList.map((item) => {   // , index
                if (item.id === card.id) {
                    return { ...item, name: card.name, link: card.link}; // , indexNumber: index
                } else {
                    return item;
                }
            });

            return updatedList;
        })}

    //  Allows user to delete single LinkCard based on it's id property
    const deleteFunction = (num) => {
        console.log(num);
        if(Array.isArray(listOfLinks)) {
            setListOfLinks(prevLinks => {
                let newArray = prevLinks.filter(link => link.id !== num);
                newArray.forEach((item, index) => item.indexNumber = index)
                checkIfEmpty(newArray);
                return newArray
            });
            };

        };

    //  Checks  --  listOfLinks is empty  ?  disables save button and displayLinks is set to false  :  keep the same
    const checkIfEmpty = (arr) => {
        console.log(arr.length);
        if(arr.length === 0) {
            setDisabled(true);
            setDisplayLinks(false);
            console.log('inside of check ran');
        }
    };

    //  Saved details to both global var userDetails and Firestore database
    const saveLinks = async () => {
        setDisabled(true);
        const reference = doc(db, 'users', userDetails.uid)
        await updateDoc(reference, {
            links: listOfLinks
        })
        setUserDetails(prevState => ({...prevState, links: listOfLinks}));
    }

    //  If user has saved links pulled in during login, this handles displaying them properly
    useEffect(() => {
        if(userDetails.links.length > 0) {
            setDisplayLinks(true);
            setListOfLinks(userDetails.links);
            
        }
    }, [userDetails.links])

    //  Loops through all the links and checks to see if every link has been filled out
    useEffect(() => {
        let flag;
        listOfLinks.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if(obj[key].length === 0 || obj[key] === undefined || obj[key] === null) {
                    flag = true;
                }
            });
            if(flag) {
                setDisabled(true);
            }
            else {
                setDisabled(false);
            }
        })
        console.log('ListOfLinks', listOfLinks);
    }, [listOfLinks]);

    //  Begins drag and drop logic
    const handleMove = (x) => {
        dragIndexRef.current = x;
    }

    //  Keeps track of scrollTop property of scrollable container
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            scrollPositionRef.current = scrollContainerRef.current.scrollTop;
        }
    }

    //  Sets tup of scrollable container to scrollPositionRef everytime listOfLinks changes
    //  to stop from rerendering to top of container
    useLayoutEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPositionRef.current;
        }
    }, [listOfLinks])

    const handleDrop = (e) => {
        e.preventDefault();
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
    }

    const handleDragOver = (e, index) => {
        e.preventDefault();
        const dragIndex = dragIndexRef.current;
        if(dragIndex === index || dragIndex === null || index === null || index === undefined) {
            return;
        }

        const draggedItem = listOfLinks[dragIndex];
        const hoverBoundingRect = document.getElementById(`item-${index}`)?.getBoundingClientRect();
        const offset = e.clientY - hoverBoundingRect.top - hoverBoundingRect.height / 2;

        const closestIndex = listOfLinks.reduce((closest, _, i) => {
            if (i === dragIndex || i === index) return closest;
            const elem = document.getElementById(`item-${i}`);
            const rect = elem.getBoundingClientRect();
            const elemOffset = e.clientY - rect.top - rect.height / 2;
            if (Math.abs(elemOffset) < Math.abs(offset)) {
                return i;
            }
            return closest;
        }, null);

        if (closestIndex !== null) {
            return;
        }

        // if (offset < 20) {
        //     scrollContainerRef.scrollTop -= 10;
        // } else if (offset > hoverBoundingRect - 500) {
        //     scrollContainerRef.scrollTop += 10;
        // }

        if (offset >= 0) {
            setListOfLinks((prevList) => {
                const newList = [...prevList];
                newList.splice(dragIndex, 1);
                if (index === 0) {
                    newList.unshift(draggedItem);
                } else {
                    newList.splice(index, 0, draggedItem);
                }
                console.log(prevList);
                console.log(newList);
                return newList;
            });
            dragIndexRef.current = index;
        }
    }


    return (
        <>
            <div className="px-5 pt-5 mb-3">
                <h1 className="text-2xl font-bold mb-3 mt-5">Customize your links</h1>
                <p className="text-customGrey">Add/edit/remove links below and then share all your profiles with the world!</p>
                <button className="block border-1 border-customPurple text-customPurple font-bold w-full py-2 rounded-lg mt-8"
                        onClick={addNewLink}>+ Add new link</button>
            </div>

                {displayLinks ?

                <div ref={scrollContainerRef} className="overflow-y-scroll h-[55%]"
                     onDrop={handleDrop}
                     onDragEnter={handleDragEnter}
                     onScroll={handleScroll}>
                    {memoizedListOfLinks.map((card, index) => {
                        return(
                        <LinkCard key={card.id}
                                  index={index}
                                  item={card}
                                  onDragOver={handleDragOver}
                                  updateList={(item) => handleCardUpdate(item)}
                                  deleteLinkCard= {(num) => deleteFunction(num)}
                                  urlAddress={card.link}
                                  selectedPlatform={card.name}
                                  moveLinkCard={(i) => handleMove(i)}
                                  ></LinkCard>)
})}
                </div>
                 :
            <div className="overflow-hidden h-[55%]">
                <div className="bg-customLightGrey my-4 mx-5 rounded-lg text-center rounded-lg">
                    <div className="px-20 pt-10">
                        <Image
                        src={PhoneIcon}
                        alt="Illustration Empty Icon"
                        className="mx-auto">
                        </Image>
                    </div>
                    <h1 className="text-2xl font-bold mx-4 mt-4">Lets get you started</h1>
                    <p className="text-customGrey mx-4 mt-5 pb-8">Use the Add new link button to get started. Once you have more than one link,
                        you can reorder and edit them. We are here to help you and share your profiles with everyone.
                    </p>
                </div>
            </div>}

            <div className="absolute bottom-0 w-full pb-5 bg-customWhite">
                <div className="border-b border-customBorders"></div>
                <div className="px-5">
                    <button className="mt-5 bg-customPurple text-customWhite w-full font-bold py-2 rounded-lg disabled:bg-customLightPurple"
                            disabled={disabled}
                            onClick={saveLinks}
                            >Save</button>
                </div>
            </div>
        </>
    );
}
