import {auth} from '../../firebase/firebase-config';
import { useRouter } from 'next/router';

export default function DashboardPage({user}) {  

  const router = useRouter();
  
  function logOut() 
  {
    window.localStorage.setItem('user',JSON.stringify(null));
    auth.signOut();
    router.push('/login');
  }
  
    return (
    <>
        <div>The current User is : {user.email}</div>
        <button onClick={logOut}>Sign out</button>
    </>
  )
}
