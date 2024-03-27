export default function CreateProfile () { 


return(
    <>
    <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-customGrey my-2">Let's get you started sharing your links!</p>
        <form className="mt-10">
            <div className="flex flex-col relative mt-2">
                <label className="text-xs my-1">Email Address</label>
                <input 
                className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                active:border-customPurple text-customGrey pl-10 py-2 rounded-lg
                invalid:border-customRed" 
                type="email"
                placeholder="e.g. alex@email.com"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"></input>
                <div className="absolute left-3.5 top-[37px]">
                </div>
            </div>
            <div className="flex flex-col relative mt-5">
                <label className="text-xs my-1">Create Password</label>
                <input 
                className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                active:border-customPurple text-customGrey pl-10 pr-2 py-2 rounded-lg
                invalid:border-customRed" 
                type="password"
                placeholder="At least 8 characters"
                pattern=".{8,}"></input>
                <div className="absolute left-3.5 top-[37px]">
                </div>
            </div>
            <div className="flex flex-col relative mt-5">
                <label className="text-xs my-1">Confirm Password</label>
                <input className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                active:border-customPurple text-customGrey pl-10 pr-2 py-2 rounded-lg" 
                type="password" 
                placeholder="At least 8 characters"
                ></input>
                <div className="absolute left-3.5 top-[37px]">
                </div>
            </div>
            <p className="text-xs text-customGrey my-6">Password must contain at least 8 characters</p>
            <button className="w-full border-1 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
            active:shadow-lg active:shadow-customLightPurple
            text-white rounded-lg" 
            type="submit"
            >Create new account</button>
        </form>
    </div>
    </>
);
}