import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import Password from "../../../../public/images/icon-password.svg";
import Email from "../../../../public/images/icon-email.svg";
import Image from "next/image";

export default function CreateProfile ({ setDisplay }) { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const router = useRouter();
    // const { userDetails, setUserDetails } = useContext(UserDetailsContext);


    const validateEmail = (x) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(x);
    }

    const validatePassword = (x) => {
        if (x.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    }

    // if (password.length < 8) {
    //     setPasswordError('Password must be at least 8 characters long');
    //     return;
    // } else if (password !== confirmPassword) {
    //     setPasswordError('Passwords do not match');
    //     return;
    // } else setPasswordError('');


    const createNewAccount = async (e) => {
        e.preventDefault();
        try{
            if(!validateEmail(email)) {
                setEmailError('Invalid email');
                return;
            } else {
                setEmailError('');
            }
            validatePassword(password);
            if(passwordError.length > 0) {
                return;
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
            setDisplay(0);
        }
        catch (error) {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setEmailError('An account with this email alrady exists. Please use a different email.');
                    break;
                case 'auth/invalid-email':
                    setEmailError('Invalid email');
                    break;
                default :
                setPasswordError('An error has occurred. Please try again later.');
            }
            console.error('Error while logging in:', errorMessage);
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
                active:border-customPurple text-customGrey pl-10 py-2 rounded-lg focus:ring focus:ring-customLightPurple focus:ring-opacity-50 focus:shadow-lg focus:shadow-customLightPurple
                invalid:border-customRed" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@email.com"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"></input>
                <div className="absolute left-3.5 top-[37px]">
                    <Image
                        src={Email}
                        alt="Email Icon" />
                </div>
            </div>
            {emailError && <span className="fixed h-6 text-sm text-red-500">{emailError}</span>}
            <div className="flex flex-col relative mt-5">
                <label className="text-xs my-1">Create Password</label>
                <input 
                className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                active:border-customPurple text-customGrey pl-10 pr-2 py-2 rounded-lg focus:ring focus:ring-customLightPurple focus:ring-opacity-50 focus:shadow-lg focus:shadow-customLightPurple
                invalid:border-customRed" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                pattern=".{8,}"></input>
                <div className="absolute left-3.5 top-[37px]">
                    <Image 
                        src={Password}
                        alt="Password Icon"/>
                </div>
            </div>
            {passwordError && <span className="fixed h-6 text-sm text-red-500">{passwordError}</span>}
            <div className="flex flex-col relative mt-5">
                <label className="text-xs my-1">Confirm Password</label>
                <input className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                active:border-customPurple text-customGrey pl-10 pr-2 py-2 rounded-lg focus:ring focus:ring-customLightPurple focus:ring-opacity-50 focus:shadow-lg focus:shadow-customLightPurple" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="At least 8 characters"
                ></input>
                <div className="absolute left-3.5 top-[37px]">
                    <Image 
                        src={Password}
                        alt="Password Icon"/>
                </div>
            </div>
            {passwordError && <span className="fixed h-6 text-sm text-red-500">{passwordError}</span>}
            {/* <p className="text-xs text-customGrey my-6">Password must contain at least 8 characters</p> */}
            <button className="w-full border-1 border-red block mx-auto mt-8 py-2 bg-customPurple active:bg-customPurpleActive
            active:shadow-lg active:shadow-customLightPurple hover:shadow hover:shadow-customLightPurple hover:opacity-40
            text-white rounded-lg" 
            type="submit"
            >Create new account</button>
        </form>
    </div>
    </>
);
}