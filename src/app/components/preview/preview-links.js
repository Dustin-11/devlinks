'use client';

import { UserDetailsContext } from "@/app/layout";
import { useContext, useEffect } from "react";
import LinkButton from "./preview-link-button";

export default function PreviewLinks() {
    const { userDetails } = useContext(UserDetailsContext);
    useEffect(() => {
        console.log(userDetails.links);
    }, [])
    return(
        <ul className="px-0 sm:px-8 pt-8 md:pt-3 md:px-0">
            {userDetails.links && (userDetails.links.map((card) => (<LinkButton key={card.indexNumber} linkAddress={card.link} themeSetter={card.name}></LinkButton>)))}
        </ul>
    );
}