import {LoginPageLayout} from './Login';
import style from './Login.module.scss';
import Link from 'next/link';
import { useState,useRef } from 'react';
import {  sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../firebase/firebase-config';
import { EmailField } from './Login';

export default function ResetPassword() 
{
    const [errorMessage,setErrorMessage] = useState(null);
    const [succesMessage,setSuccesMessage] = useState(null);
    const emailRef = useRef();
    const [email,setEmail] = useState("");

    function setFocus(ref) {
        ref.current.focus();
    }

    function sendLink(e) {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setErrorMessage(null);
            setSuccesMessage("Reset Email Sent");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if (errorCode=="auth/user-not-found") {
                setErrorMessage("This email is not registered");
            }
            else if(errorCode=="auth/invalid-email")
            {
                setErrorMessage("Invalid email format");
            }
            
          });
    }

    return (
    <LoginPageLayout>
        <div className={style.content__right}>
            <div className={style.content__right__top}>
                <h2>Reset Password</h2>
                <Link href={'/login'}><button>Login</button></Link>
            </div>
            <p>We’ll send you an email with a link to reset the password to your account.</p>
            {
                errorMessage &&
                <label className={style.errorMesg}>
                    <p>{errorMessage}</p>
                </label>            
            }    
            <form onSubmit={(e)=>sendLink(e)}>        
                <EmailField
                    setFocus={setFocus}
                    emailRef={emailRef}
                    email={email}
                    setEmail={setEmail}
                    placeholder={'email@example.com'}
                />
                {
                    succesMessage ?
                    <label className={style.successMesg}>
                        <p>{succesMessage}</p>
                    </label>       
                    :
                    <section>
                        <input type="submit" value='Send Password Reset Link'/>
                    </section>
                }
                
                </form>
        </div>
    </LoginPageLayout>
  )
}
