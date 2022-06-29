import ModaleLayout from "./ModaleLayout"
import {userContext} from "../../../Context/UserContext";
import { useContext, useState } from "react";
import { useRef } from "react";
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {colors} from '../../../utils/Colors'
import { ThemeCntxt } from "../../../Context/ThemeContext";
import style from '../Dashboard.module.scss';

export default function BudgetModale({setBudgets,budgets,cards,total,setBudgetsModale}) {
    const {user} = useContext(userContext);
    const {dark} = useContext(ThemeCntxt);
    const defaultNameInput = useRef();
    const customNameInput = useRef();
    const sumInput = useRef();
    const colorInput = useRef();
    const [usingCustom,setUsingCustom] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null)

    function addbudget(e) 
    {        
        e.preventDefault();
  
        if (!checkIfMaxReached(parseFloat(sumInput.current.value))) return;

        let namevalue = usingCustom ? customNameInput.current.value : defaultNameInput.current.value;        

        if (!checkInput(namevalue,sumInput.current.value,setErrorMessage,budgets,usingCustom)) return;


        let expDoc = doc(collection(db,`users/${user.uid}/budgets`),`${namevalue}`);
        let expDocAdd = setDoc(expDoc,{
          name:namevalue,
          sum:parseFloat(sumInput.current.value),
          color:(usingCustom ? colorInput.current.value : null),
          lastUse:new Date().getTime(),
          createdAt:new Date().getTime()  
        }).then(()=>{
          
            setBudgets(exp=>[{
                name:namevalue,
                sum:parseFloat(sumInput.current.value),
                lastUse:new Date().getTime(),
                color:(usingCustom ? colorInput.current.value : null),
          },...exp])

          setBudgetsModale(false);

        }).catch((error)=>{
          console.log(error);
        })
      } 
  
    function checkIfMaxReached(sum) {
      let available = total;
      budgets.forEach(element => {
        available-=element.sum;
      });

      if (sum>available) {
        setErrorMessage(`Error : max available $ ${(available).toFixed(2)}`);
        return false;
      }
      return true;
    }

  
    return (
    <ModaleLayout topLeft='Add a budget'>
        {
          cards.length==0 ?
          <p>You have to register a card to add budgets</p>
          :
          <form onSubmit={addbudget}>
            <div 
            className={`${style.input_field} ${dark ? style.dark : style.light} ${usingCustom? style.disabled:""}`}>
                <label htmlFor="">Default budget name</label>
                <input 
                  list="names" 
                  ref={defaultNameInput} 
                  disabled={usingCustom}
                  placeholder='Select a budget'
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
              <p className={style.customNameP}>Use a custom name</p>
              <input type="checkbox" name="custom"  onInput={()=>{
                setUsingCustom(custom=>!custom)
              }}/>
            </div>
            <div className={`${style.input_field} ${dark ? style.dark : style.light} ${!usingCustom? style.disabled:""}`}>
              <label htmlFor="">custom name</label>
              <input 
                type="text" 
                disabled={!usingCustom}
                ref={customNameInput}                
                placeholder={'Gym'}
              />
            </div>
            <div className={`${style.color_field} ${dark ? style.dark : style.light} ${!usingCustom? style.disabled:""}`}>
              <label htmlFor="">select a color</label>
              <input type="color" ref={colorInput} disabled={!usingCustom}/>
            </div>
            <div className={`${style.input_field} ${dark ? style.dark : style.light}`}>
                <label htmlFor="">sum</label>
                <input type="number" step='0.01' ref={sumInput} placeholder='1000.00'/>
            </div>
            <div className={style.errorMesg}>
              {
                errorMessage && <p>{errorMessage}</p>
              }
            </div>
            <div className={style.submit}>
                <input type="submit" value={'add budget'}/>
            </div>
          </form>
        }
        
    </ModaleLayout>
  )
}


function checkInput(name,sum,setErrorMessage,budgets,usingCustom) 
{ 
  if (name=="") {
    setErrorMessage('Please set a name')
    return false;
  }
  if (budgets.filter(item=>item.name==name).length==1) {
    setErrorMessage('This budget already exists')
    return false;    
  }
  if (!usingCustom && !colors[name]) 
  {
    setErrorMessage('Please select a default budget name')
    return false;
  }

  if (usingCustom && colors[name]) {
    setErrorMessage('Please uncheck the "Using a custom name" to use this name')
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

  setErrorMessage(null);
  return true;
}