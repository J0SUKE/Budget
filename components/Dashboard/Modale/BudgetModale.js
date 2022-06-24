import ModaleLayout from "./ModaleLayout"
import {userContext} from "../../../Context/UserContext";
import { useContext, useState } from "react";
import { useRef } from "react";
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {colors} from '../../../utils/Colors'

export default function BudgetModale({setBudgets}) {
    const {user} = useContext(userContext);
    const defaultNameInput = useRef();
    const customNameInput = useRef();
    const sumInput = useRef();
    const colorInput = useRef();
    const [usingCustom,setUsingCustom] = useState(false);

    function addbudget(e) 
    {        
        e.preventDefault();
        let namevalue = !usingCustom ? customNameInput.current.value : defaultNameInput.current.value;

        let expDoc = doc(collection(db,`users/${user.uid}/budgets`),`${namevalue}`);
        let expDocAdd = setDoc(expDoc,{
          name:namevalue,
          sum:sumInput.current.value,
          color:(usingCustom ? null : colorInput.current.value),
          createdAt:new Date().getTime()  
        }).then(docRef=>{
          
            console.log(docRef);
            setBudgets(exp=>[{
                name:namevalue,
                sum:sumInput.current.value,
                color:(usingCustom ? null : colorInput.current.value),
          },...exp])
        }).catch((error)=>{
          console.log(error);
        })
      } 
  
  
    return (
    <ModaleLayout>
        <form onSubmit={addbudget}>
            <div>
                <label htmlFor="">Default budget name</label>
                <input list="names" ref={defaultNameInput} onInput={(e)=>{
                  if(e.target.value=="") setUsingCustom(false)
                  else setUsingCustom(true)                                    
                }}/>                
                <datalist id="names">
                  {
                    Object.keys(colors).map(item=>(
                      <option key={Math.random()*100} value={item}></option>
                    ))
                  }
                </datalist>
            </div>
            <div>
              <label htmlFor="">Custom budget name</label>
              <input type="text" disabled={usingCustom} ref={customNameInput}/>
            </div>
            <div>
              <label htmlFor="">Color</label>
              <input type="color" ref={colorInput} disabled={usingCustom}/>
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
