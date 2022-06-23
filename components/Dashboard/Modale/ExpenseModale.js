import React, { useContext, useState } from 'react'
import ModaleLayout from './ModaleLayout'
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {userContext} from '../../../Context/UserContext';


export default function ExpenseModale({setExpenses}) 
{
    
    const {user} = useContext(userContext);
    const [input,setInput] = useState({name:"",sum:"",time:""});

    function addExpense(e) {
        e.preventDefault();
    
        let expDoc = addDoc(collection(db,`users/${user.uid}/expenses`),{
          name:input.name,
          sum:input.sum,
          time:input.time,
          createdAt:new Date().getTime()  
        }).then(docRef=>{
          
          setExpenses(exp=>[{
            name:input.name,
            sum:input.sum,
            time:input.time,
            id:docRef._key.path.segments[3]        
          },...exp])
        })
      } 

    return (
    <ModaleLayout>
        <form onSubmit={addExpense}>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" value={input.name} onInput={(e)=>setInput(input=>({
                    ...input,
                    name:e.target.value
                }))}/>
            </div>
            <div>
                <label htmlFor="">Sum</label>
                <input type="number" value={input.sum} onInput={(e)=>setInput(input=>({
                    ...input,
                    sum:e.target.value
                }))}/>
            </div>
            <div>
                <label htmlFor="">Date</label>
                <input type="date" value={input.time} onInput={(e)=>setInput(input=>({
                    ...input,
                    time:e.target.value
                }))}/>
            </div>
            <div>
                <input type="submit" value={'add'}/>
            </div>
        </form>
    </ModaleLayout>
  )
}
