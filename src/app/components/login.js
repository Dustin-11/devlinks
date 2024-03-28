import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserDetailsContext } from "../layout";
import { db } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";
import Email from "../../../public/images/icon-email.svg";
import Password from "../../../public/images/icon-password.svg";

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const router = useRouter();

    const retrieveData = async() => {
        const docRef = doc(db, 'users', userDetails.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log('No data exists');
        }
    }

    //  Is being triggered when saving profile page.js
    useEffect(() => {
        if(userDetails.uid) {
        const fetchData = async() => {
            const data = await retrieveData();
            setUserDetails(prevUserDetails => ({
                ...prevUserDetails,
                firstName: data.firstName || prevUserDetails.firstName || '',
                lastName: data.lastName || prevUserDetails.lastName || '',
                photo: data.photo || prevUserDetails.photo || '',
                links: data.links || prevUserDetails.links || []
            }))
            }
            fetchData();
        }
    }, [userDetails.uid]);

    const loginAccount = (e) => {
        e.preventDefault()
        console.log(auth);
        signInWithEmailAndPassword(auth, emailAddress, passwordText)
        //  Takes the saved user credentials in Firestore and sets them as global variable UserDetails
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
            setUserDetails(prevUserDetails => ({
                ...userDetails,
                uid: user.uid,
                email: user.email || prevUserDetails.email
            }));
        })
        .then(() => {
            // router.push('/account');
            setEmailAddress('');
            setPasswordText('');
        })
        .catch((error) => {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'An account with this email does not exist. Please create a new account.'
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid email/password. Please check sign-in information and try again.'
                    break;
                default :
                errorMessage = 'An error has occurred. Please try again later.'
            }
            console.error('Error while loggin in:', errorMessage);
        })
    }

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
                value={emailAddress}
                onChange={(e) => {setEmailAddress(e.target.value)}}
                placeholder="e.g. alex@email.com"></input>
                <div className="absolute left-3.5 top-[37px]">
                    <Image
                    src={Email}
                    alt="Email Icon" />
                </div>
            </div>
            <div className="flex flex-col relative mt-5">
                <label className="text-xs my-1">Password</label>
                <input className="border-1 border-customBorders text-customGrey pl-10 pr-2 py-2 rounded-lg"
                type="password"
                value={passwordText}
                onChange={(e) => {setPasswordText(e.target.value)}}
                placeholder="Enter your password"></input>
                <div className="absolute left-3.5 top-[37px]">
                    <Image
                        src={Password}
                        alt="Password Icon"/>
                </div>
            </div>
            <button className="w-full border-1 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
            active:shadow active:shadow-customLightPurple hover:customLightPurple text-white mt-6 rounded-lg"
            type="submit"
            onClick={loginAccount}>Login</button>
        </form>
    </div>
    </>
);
}