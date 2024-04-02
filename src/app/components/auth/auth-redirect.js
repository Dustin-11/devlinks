import { redirect } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function AuthRedirect ({ children }) {

    useEffect(() => {
        const localUserString = localStorage.getItem('userDetails');
        if(localUserString) {
            const localUser = JSON.parse(localUserString)
            const localUid = localUser.uid;
            if(localUid) {
                return;
            }
        } else if(!auth.currentUser){
            redirect('/');
        }
    }, [])

    return children;
}