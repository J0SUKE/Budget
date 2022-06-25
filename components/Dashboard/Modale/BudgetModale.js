import ModaleLayout from "./ModaleLayout"
import {userContext} from "../../../Context/UserContext";
import { useContext, useState } from "react";
import { useRef } from "react";
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {colors} from '../../../utils/Colors'

export default function BudgetModale({setBudgets,budgets}) {
    const {user} = useContext(userContext);
    const defaultNameInput = useRef();
    const customNameInput = useRef();
    const sumInput = useRef();
    const colorInput = useRef();
    const [usingCustom,setUsingCustom] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null)

    function addbudget(e) 
    {        
        e.preventDefault();
                      
        let namevalue = usingCustom ? customNameInput.current.value : defaultNameInput.current.value;        

        if (!checkInput(namevalue,sumInput.current.value,setErrorMessage,budgets)) return;

        let expDoc = doc(collection(db,`users/${user.uid}/budgets`),`${namevalue}`);
        let expDocAdd = setDoc(expDoc,{
          name:namevalue,
          sum:parseFloat(sumInput.current.value),
          color:(usingCustom ? colorInput.current.value : null),
          lastUse:new Date().getTime(),
          createdAt:new Date().getTime()  
        }).then(docRef=>{
          
            console.log(docRef);
            setBudgets(exp=>[{
                name:namevalue,
                sum:parseFloat(sumInput.current.value),
                lastUse:new Date().getTime(),
                color:(usingCustom ? colorInput.current.value : null),
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
                <input 
                  list="names" 
                  ref={defaultNameInput} 
                  disabled={usingCustom}
                />                
                <datalist id="names">
                  {
                    Object.keys(colors).map(item=>(
                      <option key={Math.random()*100} value={item}></option>
                    ))
                  }
                </datalist>
            </div>
            <div>
              <p>Using a custom name</p>
              <input type="checkbox" name="custom" onInput={()=>{
                setUsingCustom(custom=>!custom)
              }}/>
            </div>
            <div>
              <label htmlFor="">custom name</label>
              <input 
                type="text" 
                disabled={!usingCustom}
                ref={customNameInput}                
              />
            </div>
            <div>
              <label htmlFor="">Color</label>
              <input type="color" ref={colorInput} disabled={!usingCustom}/>
            </div>
            <div>
                <label htmlFor="">sum</label>
                <input type="number" step='0.01' ref={sumInput}/>
            </div>
            <div>
                <input type="submit" value={'add budget'}/>
            </div>
            <div>
              {
                errorMessage && <p>{errorMessage}</p>
              }
            </div>
        </form>
    </ModaleLayout>
  )
}


function checkInput(name,sum,setErrorMessage,budgets) 
{ 
  if (name=="") {
    setErrorMessage('Please set a name')
    return false;
  }
  if (budgets.filter(item=>item.name==name).length==1) {
    setErrorMessage('This budget already exists')
    return false;    
  }

  if (sum=="") {
    setErrorMessage('Please set a sum')
    return false;
  }
  if (parseFloat(sum)<0) {
    setErrorMessage('Sum must be positive');
    return false;
  }

  return true;
}