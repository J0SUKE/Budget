import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase/firebase-config'

export const userContext = React.createContext(null);


export default function UserContext({children}) {
  
    const [user,setuser] = useState(null);
    const router = useRouter();
    const [initialPage,setinitialPag] = useState(router.asPath);

        
    function setUser(user) 
    {
        setuser(user);
        window.localStorage.setItem('user',JSON.stringify(user));
    }


    useEffect(()=>{
            
        if (!JSON.parse(localStorage.getItem('user'))) // si pas d'utilisateur
        {
            if (initialPage!='/') // si aucun user n'est enregistré et qu'on essaye d'acceder a une autre page que / ==> on redirige vers /login
            {
                router.push('/login');    
            }            
        }
        else
        {
            // un user est deja enregistré dans le stockage local
            // il faut maintenat verifier si il y'a eu un chagement d'email ou une suppression du compte
            
            const USER = JSON.parse(localStorage.getItem('user'))
            const userDoc = doc(db, `users`, `${USER.uid}`);
            const getUserDoc = getDoc(userDoc)
            .then((res)=>{
                if (!res.exists() && initialPage!='/') // dans le cas de compte supprimé
                {
                    router.push('/login');
                }
                else if((res.data().email != USER.email) && initialPage!='/') // dans le cas d'email modifié
                {
                    router.push('/login');
                }
                else
                {
                    setUser(JSON.parse(localStorage.getItem('user')));
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },[])

    useEffect(()=>{
        if ((router.asPath=='/dashboard' || router.asPath.startsWith('/settings')) && !JSON.parse(localStorage.getItem('user'))) 
        {
            router.push('/login')
        }
    },[router])

    return <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
}
