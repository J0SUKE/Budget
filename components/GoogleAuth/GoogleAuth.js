import style from './GoogleAuth.module.scss';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase/firebase-config";
import { auth,db } from '../../firebase/firebase-config';
import {setDoc,doc } from "firebase/firestore"; 
import { useRouter } from 'next/router'

export default function GoogleAuth({message,setErrorMessage,setUser}) 
{  
    const router = useRouter()
    
    function googleSingIn() {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
        .then((user) => {
            setErrorMessage(null);
            setUser(user);            

            setDoc(doc(db, "users", `${user.uid}`), {
                email: user.email,
              });            
        })
        .then(()=>{            
            router.push('/dashboard');
        })
    }
  
    return (
    <div className={style.google_btn} onClick={googleSingIn}>
        <img src="/images/google.png" alt="" />
        <p>{message}</p>
    </div>
  )
}
