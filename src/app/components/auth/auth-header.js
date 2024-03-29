'use client';

import Image from "next/image";

export default function AuthHeader() {
    return(
        <div className="w-full flex border-red justify-start md:justify-center">
            <Image
                src="/images/logo-devlinks-small.svg"
                alt="Logo Icon"
                width={40}
                height={40} />
            <h1 className="text-customLarge text-customDarkGrey font-customBold font-extrabold ml-2">devlinks</h1>
        </div>
    );
}