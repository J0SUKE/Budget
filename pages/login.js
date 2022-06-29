import { useContext, useState } from "react";
import {auth} from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'
import {userContext} from '../Context/UserContext';
import Login from "../components/Login/Login";

export default function LoginPage() 
{
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState(null);
  const router = useRouter()
  const {setUser} = useContext(userContext);
  const [isLoading,setIsloading] = useState(false);

  function connect(e) {
    e.preventDefault();

    if (email=="") {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (password=="") {
      setErrorMessage("Please enter a password");
      return;
    }

    setIsloading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setErrorMessage(null);
      setUser(userCredential.user); 
      router.push('/dashboard');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      setIsloading(false);
      console.log(errorCode);
      if (errorCode=="auth/wrong-password") {
        setErrorMessage("Wrong password");
      }
      else if (errorCode=="auth/user-not-found") {
        setErrorMessage("User not found");
      }
      else if(errorCode=="auth/invalid-email")
      {
        setErrorMessage("Invalid email format");
      }
    });
  }
  
  return (
    <Login 
        connect={connect} 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setUser={setUser}
        isLoading={isLoading}
      />      
  )
}
