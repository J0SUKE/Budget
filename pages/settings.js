import React, { useContext, useRef } from 'react'

import {auth} from '../firebase/firebase-config';
import { signInWithEmailAndPassword,updatePassword,updateEmail,sendPasswordResetEmail,deleteUser,sendSignInLinkToEmail,reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { userContext } from '../Context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import Settings from '../components/Settings/Settings';
import { ThemeCntxt } from '../Context/ThemeContext';

export default function SettingsPage() {
  
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

    if (passwordRef.current.value=="") {
      setErrorMessage('Please type your password') 
      return;
    }

    if (emailInput.current.value=="") {
      setErrorMessage('Please type your new email') ;
      return;
    }

    signInWithEmailAndPassword(auth,user.email, passwordRef.current.value)
    .then(function(userCredential) {

      updateEmail(userCredential.user,emailInput.current.value)
      .then(()=>{

        let userDoc = doc(db,`users`,`${user.uid}`)                

        let updateUserEmail = updateDoc(userDoc,{
          email:emailInput.current.value
        }).then(()=>{
          router.push('/login');
        })
        
    }).catch((error)=>{
      if (error.code == "auth/email-already-in-use") {
        setErrorMessage("This email is already in use ");
      }
      if (error.code == "auth/invalid-email") {
        setErrorMessage("Please enter a valid email");
      }
      console.log(error.code);
      
    })    
      
    })
    .catch(error=>{
      if (error.code == "auth/wrong-password") {
        setErrorMessage("Incorrect password");
      }      
      console.log(error.code);      
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


  function clearUser(e,setErrorMessage) {
    e.preventDefault();
    
    if (deleteAccountEmailRef.current.value!=user.email) {
      setErrorMessage('Wrong email')
      return;
    }

    signInWithEmailAndPassword(auth,deleteAccountEmailRef.current.value, deleteAccountPasswordRef.current.value)
    .then(userCredential=>deleteUser(userCredential.user))
    .then(res=>{
      deleteDoc(doc(db,`users`,`${user.uid}`));
      localStorage.setItem('user',null);
      router.push('/login');
    })
    .catch(error=>{

      if (error.code=="auth/invalid-email") {
        setErrorMessage("Invalid email");
      }
      if (error.code=="auth/user-not-found") {
        setErrorMessage("Wrong email");
      }
      if (error.code=="auth/wrong-password") {
        setErrorMessage("Incorrect password");
      }
      console.log(error.code);
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
  
  return (
    <>
    {
      user ?
      <Settings 
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
      :
      null
    }
    </>    
  )  
}
