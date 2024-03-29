'use client';

import Image from "next/image";
import { ShareDetailsContext } from "@/app/preview/[uid]/page";
import { useContext} from "react";
import ShareLinkButton from "./share-link-button";

export default function ShareLinks() {
    const { profile } = useContext(ShareDetailsContext);
    
    return(
        <ul className="px-12 pt-8 md:pt-3 md:px-0">
            {profile.links && (profile.links.map((card) => (<ShareLinkButton key={card.indexNumber} linkAddress={card.link} themeSetter={card.name}></ShareLinkButton>)))}
        </ul>
    );
}