import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import {auth} from '../firebase/firebase-config';
import { useRouter } from 'next/router'
import {userContext} from '../Context/UserContext';


export default function SignupPage() {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const router = useRouter()
    const {setUser} = useContext(userContext);
    
    function signIn(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setErrorMessage(null);
            setUser(userCredential.user);
            router.push('/dashboard');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if (errorCode=="auth/email-already-in-use") {
                setErrorMessage("Email already in use");
            }
        });
    }
    
    
    return (
      <form onSubmit={(e)=>signIn(e)}>
          <div>
              <label htmlFor="">email</label>
              <input type="email" value={email} onInput={(e)=>setEmail(e.target.value)}/>            
          </div>
          <div>
              <label htmlFor="">password</label>
              <input type="password" value={password} onInput={(e)=>setPassword(e.target.value)}/>
          </div>
          {
            errorMessage &&
            <div>
                <p style={{color:'red'}}>{errorMessage}</p>
            </div>
          }
          <div>
              <input type="submit" value={'signUp'}/>
          </div>
      </form>
    )
  }
  