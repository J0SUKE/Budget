import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import {auth} from '../firebase/firebase-config';
import { useRouter } from 'next/router'
import {userContext} from '../Context/UserContext';
import Signup from "../components/Signup/Signup";
import {setDoc,doc } from "firebase/firestore"; 
import { db } from "../firebase/firebase-config";

export default function SignupPage() 
{    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const router = useRouter()
    const {setUser} = useContext(userContext);
    const [isLoading,setIsloading] = useState(false);

    function signIn(e) {
        e.preventDefault();

        if (!verifyPassword(password,setErrorMessage)) return;

        setIsloading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setErrorMessage(null);
            setUser(userCredential.user);            

            setDoc(doc(db, "users", `${userCredential.user.uid}`), {
                email: email,
              });            
        })
        .then(()=>{            
            router.push('/dashboard');
        })
        .catch((error) => {
            
            setIsloading(false);
            const errorCode = error.code;
            
            if (errorCode=="auth/email-already-in-use") {
                setErrorMessage("Email already in use");
            }
            else if (errorCode=="auth/internal-error") {
                setErrorMessage("Internal Error");
            }
            console.log(errorCode);
        });
    }

    
    return (
        <Signup
            signIn={signIn}
            setEmail={setEmail}
            email={email}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}            
            setErrorMessage={setErrorMessage}
            setUser={setUser}
            isLoading={isLoading}
        />
    )
  }
  

export function verifyPassword(password,setErrorMessage) 
{
    
    if (password.length<6) 
    {
        setErrorMessage("Password must be at least 6 characters");
        return false;
    }
    
    return true;
}