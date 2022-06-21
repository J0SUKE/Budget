import {auth} from '../../firebase/firebase-config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDoc,doc,query, where, getDocs  } from "firebase/firestore"; 
import { db } from '../../firebase/firebase-config';

export default function Dashboard({user}) {  

  const router = useRouter();
  const [accountInput,setAccountInput] = useState({name:"",sum:0});
  const [expensesInput,setExpensesInput] = useState({name:"",sum:"",time:""});
  const [expenses,setExpenses] = useState([]);

  
  function logOut() 
  {
    window.localStorage.setItem('user',JSON.stringify(null));
    auth.signOut();
    router.push('/login');
  }

  function addAccount(e) {
    e.preventDefault();
    
    const docRef = addDoc(collection(db,`users/${user.uid}/accounts`),{
      name:accountInput.name,
      sum:accountInput.sum
    })    
  }
  
  function addExpense(e) {
    e.preventDefault();

    let expDoc = addDoc(collection(db,`users/${user.uid}/expenses`),{
      name:expensesInput.name,
      sum:expensesInput.sum,
      time:expensesInput.time
    }).then(docRef=>{
      
      setExpenses(exp=>[...exp,{
        name:expensesInput.name,
        sum:expensesInput.sum,
        time:expensesInput.time,
        id:docRef._key.path.segments[3]        
      }])
    })
  }

  function getExpenses() {
    const q = query(collection(db, `users/${user.uid}/expenses`));
    

    let data = [];
    const docSnap = getDocs(q)
    .then(res=>{
      res.forEach(element => {
        data.push({
          ...element.data(),
          id:element._document.key.path.segments[8]
        })
      });
    })
    .then(()=>{
      console.log(data);
      setExpenses([...data]);
    })
  }
  
  useEffect(()=>{
    getExpenses();
  },[])

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
          <div>
            <input type="submit" value={'add account'}/>
          </div>
        </form>
        <h2>Ajouter une dépense</h2>
        <form action="" onSubmit={(e)=>addExpense(e)}>
          <div>
            <label htmlFor="">Nom</label>
            <input type="name" value={expensesInput.name} onInput={(e)=>setExpensesInput(exp=>({
              ...exp,
              name:e.target.value
            }))}/>
          </div>
          <div>
            <label htmlFor="">Somme</label>
            <input type="number" value={expensesInput.sum} onInput={(e)=>setExpensesInput(exp=>({
              ...exp,
              sum:e.target.value
            }))}/>
          </div>
          <div>
            <label htmlFor="">time</label>
            <input type="date" value={expensesInput.time} onInput={(e)=>setExpensesInput(exp=>({
              ...exp,
              time:e.target.value
            }))}/>
          </div>
          <div>
            <input type="submit" value='Add'/>
          </div>
        </form>
        <main>
          <h2>Dépenses</h2>
          <ul>
            {
              expenses.map(exp=>(
                <li key={exp.id}>
                  <h4>{exp.name}</h4>
                  <p>{exp.sum}</p>
                  <span>{exp.time}</span>
                </li>
              ))
            }
          </ul>
        </main>
    </>
  )
}
