import ModaleLayout from './ModaleLayout';
import { colors } from '../../../utils/Colors';
import { useContext, useRef, useState } from 'react';

import { doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { userContext } from '../../../Context/UserContext';
import { ThemeCntxt } from "../../../Context/ThemeContext";
import style from '../Dashboard.module.scss';

export default function ModifyBudgetModale({modifyBudgetModale,budgets,setBudgets,total,setModifyBudgetModale}) {
  
  const {user} = useContext(userContext);
  const {dark} = useContext(ThemeCntxt);
  
  const [modColor,setModColor] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);

  const sumInput = useRef();
  const colorInput = useRef();

  function modifybudget(e) {
    e.preventDefault();

    if (sumInput.current.value!=""  && !checkSum(parseFloat(sumInput.current.value))) return;

    let newData = {};
    let newSum = parseFloat(sumInput.current.value);

    if (isNaN(newSum)) 
    {
      setErrorMessage('Please set a valid sum') 
      return;
    }

    newData.sum = newSum;

    if (modColor) newData.color = colorInput.current.value;  

    firebaseUpdateBudget(newData);
    setErrorMessage(null);
  }

  function firebaseUpdateBudget(data) 
  {
    let currentBdgt = budgets.filter(item=>item.name==modifyBudgetModale.name)[0];//budget actuel

    let budgetDoc = doc(db,`users/${user.uid}/budgets`,`${modifyBudgetModale.name}`);        
    

    let updateBudget = updateDoc(budgetDoc,data)
    .then(()=>{            
      setBudgets(budgets=>budgets.map(item=>{
        if (item.name == modifyBudgetModale.name) {
          return ({
            ...item,                
            ...data,
          })
        }
        else return item;
      }))

      setModifyBudgetModale(false);

    }).catch((error)=>{
      console.log(error);
    })
  }

  function checkSum(sum) {
    let available = total;
    budgets.forEach(element=>{
      if (element.name!=modifyBudgetModale.name) available-=element.sum;
    })

    if (sum>available) {
      setErrorMessage(`Error : max available $ ${available.toFixed(2)}`)
      return false;   
    }
    return true;
  }

  function deleteBudget() {
    let budgetDoc = doc(db,`users/${user.uid}/budgets`,`${modifyBudgetModale.name}`);    
    deleteDoc(budgetDoc).then(()=>{
      setBudgets(budgets=>budgets.filter(item=>item.name!=modifyBudgetModale.name));      
      setModifyBudgetModale(null);
    })
  }

  return (
    <ModaleLayout topLeft={'Update a budget'}>
        <form onSubmit={modifybudget}>
          <div className={`${style.input_field} ${dark ? style.dark : style.light}`}>
            <label htmlFor="">Sum</label>
            <input type="number" step='0.01' ref={sumInput} placeholder='100.00'/>
          </div>
          {
            !colors[modifyBudgetModale.name] // on ne peut modifier la couleur que si il s'agit d'un custom budget
            &&
            <>
              <div>
                <p className={style.customNameP}>Change the color ?</p>
                <input type="checkbox" onInput={()=>setModColor(col=>!col)}/>
              </div>
              <div 
              className={`${style.color_field} ${dark ? style.dark : style.light} ${!modColor && style.disabled }`}>
                <label htmlFor="">Select a color</label>
                <input type="color" disabled={!modColor} ref={colorInput}/>
              </div>
            </>
          }
          <div className={style.errorMesg}>
          {
            errorMessage &&
            <p>{errorMessage}</p>
          }
          </div>
                  
          <div className={style.submit}>
            <input type="submit" value='save changes'/>
          </div>                  
        </form>
        <div className={style.delete}>
          <button onClick={deleteBudget}>Detete budget</button>
        </div>
        
    </ModaleLayout>
  )
}
