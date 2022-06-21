import { useContext, useState } from "react";
import {auth} from '../firebase/firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'
import {userContext} from '../Context/UserContext';
import Layout from "../components/Layout/Layout";

export default function LoginPage() 
{
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState(null);
  const router = useRouter()
  const {setUser} = useContext(userContext);

  function connect(e) {
    e.preventDefault();
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
      const errorMessage = error.message;
      if (errorCode=="auth/wrong-password") {
        setErrorMessage("Wrong password");
      }
      else if (errorCode=="auth/user-not-found") {
        setErrorMessage("User not found");
      }
    });
  }
  
  return (
    <Layout>
      <form onSubmit={(e)=>connect(e)}>
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
