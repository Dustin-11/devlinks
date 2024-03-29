'use client';
import { useEffect, useState, useContext } from "react";
import { UserDetailsContext } from "@/app/layout";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfileUser({ nameRequirements, isInitialNames, emailNotification, trigger }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [storedNames, setStoredNames] = useState(false);
    const [storedEmail, setStoredEmail] = useState(false);

    //  Monitors firstName and lastName properties
    //  Uses storedNames to account for initial state changes when loading info from database
    //  After first time through, sets storedNames to false, then uses logic to monitor as normal
    useEffect(() => {
        if(!storedNames) {
            if(firstName.length >= 1 && lastName.length >= 1) {
                nameRequirements(true);
            }
            else {
                nameRequirements(false);
            }
        }
        else if(storedNames && firstName.length >= 1 && lastName.length >= 1) {
            isInitialNames(true);
            setStoredNames(false);
        }
        else {
            setStoredNames(false);
        }
        if(storedEmail) {
            if(email.length > 0) {
                emailNotification(true);
            }
            else {
                emailNotification(false);
            }
            
        }
    }, [firstName, lastName]);

    //  Need to figure out how to update active state when email is updated
    useEffect(() => {
        if(!storedEmail) {
            console.log('triggered');
            // emailNotification(true);
        }
        else {
            console.log('triggered else');
            setStoredEmail(false);
        }
    }, [email])

    //  Runs on first render, brings in and updates local variable state with userDetails properties (if exist yet)
    //  userDetails get intially updated with saved info during login
    useEffect(() => {
        let nameTrigger = 0;
        let emailTrigger = 0;
        if(userDetails.firstName) {
            setFirstName(userDetails.firstName);
            nameTrigger++;
        }
        if(userDetails.lastName) {
            setLastName(userDetails.lastName);
            nameTrigger++;
        }

        if(userDetails.email) {
            setEmail(userDetails.email);
            emailTrigger++;
        }

        if(nameTrigger > 0) {
            setStoredNames(true);
        }
        if(emailTrigger > 0) {
            setStoredEmail(true);
        }
    }, []);

    useEffect(() => {
        if(userDetails.firstName.length > 0) {
            setFirstName(userDetails.firstName);
        }
        if(userDetails.lastName.length > 0) {
            setLastName(userDetails.lastName);
        }
        if(userDetails.email.length > 0) {
            setEmail(userDetails.email);
        }
    }, [userDetails.firstName, userDetails.lastName, userDetails.email])

        //  Triggered by save button click
        //  Saves firstName, lastName, and email properties in both userDetails global variable and Firestore
        //  Sets nameRequirements back to false for button disabled value
    useEffect(() => {
        if(trigger) {
        console.log('user triggered');
        try{
            setUserDetails({...userDetails, firstName: firstName, lastName: lastName, email: email})
            const updateUser = async () => {
                if(!userDetails.uid) {
                    return;
                }
                const userReference = doc(db, 'users', userDetails.uid);
                await updateDoc(userReference, {
                  firstName: firstName,
                  lastName: lastName,
                  email: email
                });
              }
              updateUser();
              nameRequirements(false);
            }
            catch (error) {
                console.log('Error occurred:', error);
            }
        }
    }, [trigger]);


    return(
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5">
            <div className="relative">
                <div className="md:flex md:justify-between md:items-center md:mb-2">
                    <label className="block my-1 text-customDarkGrey text-xs">First Name*</label>
                    <div className=" md:w-3/5">
                        <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                               className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1 text-customDarkGrey md:mr-4"></input>
                    </div>
                </div>
                <div className="md:flex md:justify-between md:items-center md:mb-2">
                    <label className="block my-1 mt-5 text-customDarkGrey text-xs">Last Name*</label>
                    <div className="md:w-3/5">
                        <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                               className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1 text-customDarkGrey md:mr-4"></input>
                    </div>
                </div>
                <div className="md:flex md:justify-between md:items-center ">
                    <label className="block my-1 mt-5 block text-xs">Email</label>
                    <div className="md:w-3/5">
                        <input type="email" placeholder='e.g. johndoe@gmail.com' readOnly value={email} 
                               onChange={(e) => setEmail(e.target.value)}  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                               className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1 text-customDarkGrey md:mr-4"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}