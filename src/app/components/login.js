import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordText, setPasswordText] = useState('');
    // const { userDetails, setUserDetails } = useContext(UserDetailsContext);

return(
    <>
    <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-customGrey my-2">Add your details below to get back into the app</p>
        <form className="mt-8">
            <div className="flex flex-col relative mt-2">
                <label className="text-xs my-1">Email Address</label>
                <input className="border-1 border-customBorders text-customGrey pl-10 py-2 rounded-lg"
                type="email"
                placeholder="e.g. alex@email.com"></input>
                <div className="absolute left-3.5 top-[37px]">
                </div>
            </div>
            <div className="flex flex-col relative mt-5">
                <label className="text-xs my-1">Password</label>
                <input className="border-1 border-customBorders text-customGrey pl-10 pr-2 py-2 rounded-lg"
                type="password"
                placeholder="Enter your password"></input>
                <div className="absolute left-3.5 top-[37px]">
                </div>
            </div>
            <button className="w-full border-1 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
            active:shadow active:shadow-customLightPurple hover:customLightPurple text-white mt-6 rounded-lg"
            type="submit">Login</button>
        </form>

    </div>
    </>
);
}