import {auth} from '../../firebase/firebase-config';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Dashboard({user}) {  

  const router = useRouter();
  const [accountInput,setAccountInput] = useState({name:"",sum:0});
  
  function logOut() 
  {
    window.localStorage.setItem('user',JSON.stringify(null));
    auth.signOut();
    router.push('/login');
  }

  function addAccount(e) {
    e.preventDefault();
    
  }
  
    return (
    <>
        <div>The current User is : {user.email}</div>
        <button onClick={logOut}>Sign out</button>
        <h2>Ajouter un compte</h2>
        <form action="" onSubmit={(e)=>{addAccount(e)}}>
          <div>
            <label htmlFor="">Nom du compte</label>
            <input type="text" value={accountInput.name} onInput={(e)=>setAccountInput((acc)=>({
              ...acc,
              name:e.target.value
            }))}/>
          </div>
          <div>
            <label htmlFor="">somme sur le compte</label>
            <input type="number" value={accountInput.sum} onInput={(e)=>setAccountInput((acc)=>({
              ...acc,
              sum:e.target.value
            }))}/>
          </div>
        </form>
        <h2>Ajouter une dépense</h2>
        <form action="">
          <div>
            <label htmlFor="">Nom</label>
            <input type="name" />
          </div>
          <div>
            <label htmlFor="">Somme</label>
            <input type="number" />
          </div>
          <div>
            <label htmlFor="">time</label>
            <input type="date" />
          </div>
        </form>
    </>
  )
}
