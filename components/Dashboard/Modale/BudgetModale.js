import ModaleLayout from "./ModaleLayout"
import {userContext} from "../../../Context/UserContext";
import { useContext } from "react";
import { useRef } from "react";
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

export default function BudgetModale({setBudgets}) {
    const {user} = useContext(userContext);
    const nameInput = useRef();
    const sumInput = useRef();

    function addbudget(e) 
    {
        e.preventDefault();
    
        let expDoc = setDoc(doc(collection(db,`users/${user.uid}/budgets`),`${nameInput.current.value}`),{
          name:nameInput.current.value,
          sum:sumInput.current.value,
          createdAt:new Date().getTime()  
        }).then(docRef=>{
          
            console.log(docRef);
            setBudgets(exp=>[{
                name:nameInput.current.value,
                sum:sumInput.current.value,
          },...exp])
        })
      } 
  
  
    return (
    <ModaleLayout>
        <form onSubmit={addbudget}>
            <div>
                <label htmlFor="">name</label>
                <input type="input" ref={nameInput}/>
            </div>
            <div>
                <label htmlFor="">sum</label>
                <input type="number" step='0.01' ref={sumInput}/>
            </div>
            <div>
                <input type="submit" value={'add budget'}/>
            </div>
        </form>
    </ModaleLayout>
  )
}
