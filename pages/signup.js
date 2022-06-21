import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import {auth} from '../firebase/firebase-config';
import { useRouter } from 'next/router'
import {userContext} from '../Context/UserContext';
import Layout from "../components/Layout/Layout";
import {setDoc,doc } from "firebase/firestore"; 
import { db } from "../firebase/firebase-config";

export default function SignupPage() 
{    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(null);
    const router = useRouter()
    const {setUser} = useContext(userContext);
    
    function signIn(e) {
        e.preventDefault();
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
            
            console.log(error);
            const errorCode = error.code;
            
            if (errorCode=="auth/email-already-in-use") {
                setErrorMessage("Email already in use");
            }
        });
    }
    
    
    return (
      <Layout>
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
      </Layout>
    )
  }
  