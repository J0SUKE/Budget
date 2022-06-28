import React, { useContext, useRef } from 'react'

import {auth} from '../firebase/firebase-config';
import { signInWithEmailAndPassword,updatePassword,updateEmail,sendPasswordResetEmail,deleteUser,sendSignInLinkToEmail,reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { userContext } from '../Context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import Settings from '../components/Settings/Settings';

export default function settings() {
  
  const router = useRouter();
  
  // change email
  const emailInput = useRef();
  const passwordRef = useRef();
  //change password
  const newPasswordRef = useRef();
  const currentPasswordRef = useRef();

  //delete account
  const deleteAccountEmailRef = useRef();
  const deleteAccountPasswordRef = useRef();

  const {user,setUser} = useContext(userContext);



  function changeEmail(e,setErrorMessage) {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth,user.email, passwordRef.current.value)
    .then(function(userCredential) {

      updateEmail(userCredential.user,emailInput.current.value);
      
    }).then(()=>{

        let userDoc = doc(db,`users`,`${user.uid}`)                

        let updateUserEmail = updateDoc(userDoc,{
          email:emailInput.current.value
        })
        setUser({
          ...user,
          email:emailInput.current.value
        })
    })    
    .catch(error=>{
      console.log(error);      
    })

  }

  function changepassword(e,setErrorMessage,setModaleState,setSuccesPasswordModale) {
    e.preventDefault();

    signInWithEmailAndPassword(auth,user.email, currentPasswordRef.current.value)
    .then(function(userCredential) {
        
      updatePassword(userCredential.user,newPasswordRef.current.value)
      .then(()=>{
        setModaleState(false);
        setSuccesPasswordModale(true);
      })
      
    }).catch(error=>{

      if (error.code=="auth/wrong-password") {
        setErrorMessage('Wrong Password');        
      }
    })
  }

  function logOut() {
    setUser(null);
    router.push('/login');
  }


  function clearUser(e) {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth,deleteAccountEmailRef.current.value, deleteAccountPasswordRef.current.value)
    .then(userCredential=>deleteUser(userCredential.user))
    .then(res=>{
      deleteDoc(doc(db,`users`,`${user.uid}`));
      localStorage.setItem('user',null);
      router.push('/login');
    })
    .catch(error=>{
      console.log(error);
    })
  }

  function sendResetLink(e) {
    e.preventDefault()
    sendPasswordResetEmail(auth, user.email)
    .then(() => {
        console.log("email sent");
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
  

  useEffect(()=>{
      if (!JSON.parse(window.localStorage.getItem('user'))) 
      {
          router.push('/login');
      }
      else
      {
          setUser(JSON.parse(window.localStorage.getItem('user')));
      }
  },[])
  
  return <Settings 
            emailInput={emailInput} 
            passwordRef={passwordRef}
            newPasswordRef={newPasswordRef}
            currentPasswordRef={currentPasswordRef}
            deleteAccountEmailRef={deleteAccountEmailRef}
            deleteAccountPasswordRef={deleteAccountPasswordRef}
            changeEmail={changeEmail}
            changepassword={changepassword}
            logOut={logOut}
            clearUser={clearUser}
            sendResetLink={sendResetLink}
          />
}
