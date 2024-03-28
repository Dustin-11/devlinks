import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfile () { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    // const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const createNewAccount = async (e) => {
        e.preventDefault();
        try{
            if(password !== confirmPassword) {
                console.log("Check Password");
                throw new Error("Passwords do not match");
            }
            if(password.length < 8) {
                console.log("Invalid Password");
                throw new Error ("Invalid Password");
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const userId = user.uid;
            await setDoc(doc(db, 'users', userId), {
                // firstName: '',
                // lastName: '',
                email: email,
                password: password,
                uid: userId
            });

            // setUserDetails({
            //     email: email,
            //     password: password,
            //     uid: userId
            // })
            console.log('User signed up: ', userCredential.user);
            router.push('/')
        }
        catch (error) {
            console.error("Error in createNewAccount", error);
        }
    }

return(
    <>
    <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-customGrey my-2">Lets get you started sharing your links!</p>
        <form className="mt-10" onSubmit={createNewAccount}>
            <div className="flex flex-col relative mt-2">
                <label className="text-xs my-1">Email Address</label>
                <input 
                className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                active:border-customPurple text-customGrey pl-10 py-2 rounded-lg
                invalid:border-customRed" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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