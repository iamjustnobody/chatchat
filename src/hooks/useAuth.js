import { useEffect,useState } from "react";
import { fb } from "service/firebase";

export const useAuth=()=>{
    const [authUser,setAuthUser]=useState(); //undefined | firebase.User | null

    useEffect(()=>{
        const unsubscribe=fb.auth.onAuthStateChanged(user=>{
            if(user){ //if there's an user obj -> we are logged in
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })

        return unsubscribe
    },[])

    return {authUser}  //return an obj
}