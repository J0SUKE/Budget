import React, { useContext, useMemo, useRef, useState } from 'react'
import ModaleLayout from './ModaleLayout'
import { doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {userContext} from '../../../Context/UserContext';
import { ThemeCntxt } from "../../../Context/ThemeContext";
import style from '../Dashboard.module.scss';

export default function ModifyCardModale({modifyCardModale,setBudgets,setCards,cards,budgets,setModifyCardModale}) {

  const {dark} = useContext(ThemeCntxt);
  const {user} = useContext(userContext);
    
  const balanceRef = useRef();
  const colorRef = useRef();
  const [changeColor,setChangeColor] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null)

  const modifyCard = useMemo(()=>(e)=>{
    e.preventDefault();

    if (balanceRef.current.value=="" && colorRef.current.value=="") return;
    
    let newData = {};

    //pour le balance
    if (balanceRef.current.value!=="") {
      let newBalance = parseFloat(balanceRef.current.value);
      
      if (isNaN(newBalance)) {
        setErrorMessage('Please set a valid balance')
        return; 
      }

      newData.balance = newBalance;
      resetBudgets();
    }

    if (changeColor) newData.color=colorRef.current.value;


    let currentCard = cards.filter(item=>modifyCardModale.name==item.name)[0];//card actuel

    let cardDoc = doc(db,`users/${user.uid}/cards`,`${currentCard.name}`);

    let updateCard = updateDoc(cardDoc,newData)
    .then(()=>{      
      setCards(cards=>cards.map(item=>{
        if (item.name==currentCard.name) {
          return({
            ...item,
            ...newData
          })
        }
        else return item;
      }))    

      setModifyCardModale(null);

    })
  })
  

  function resetBudgets() {
    budgets.forEach(element => {
      updateDoc(doc(db,`users/${user.uid}/budgets`,`${element.name}`),{
        sum:0,
      })
    });    

    setBudgets(budgets=>budgets.map(item=>({...item,sum:0})))
  }

  function deleteCard() {
    let cardDoc = doc(db,`users/${user.uid}/cards`,`${modifyCardModale.name}`);    
    deleteDoc(cardDoc).then(()=>{
      setCards(cards=>cards.filter(item=>item.name!=modifyCardModale.name));      
      setModifyCardModale(null);
      resetBudgets()
    })
  }

  return (
    <ModaleLayout topLeft={'Update a card'}>
      <form onSubmit={modifyCard}>
        <div className={`${style.input_field} ${dark ? style.dark : style.light}`}>
          <label htmlFor="">Balance</label>
          <input type="number" step='0.01' ref={balanceRef} placeholder='1000.00'/>
        </div>
        <p 
          className={`${style.warning} ${dark ? style.dark : style.light}`}
        >If you modify the balance, all budgets will be set to 0</p>
        <div>
          <p className={style.customNameP}>Change the color ? </p>
          <input type="checkbox" onInput={()=>setChangeColor(change=>!change)}/>
        </div>
        <div className={`${style.color_field} ${dark ? style.dark : style.light} ${!changeColor && style.disabled }`}>
          <label htmlFor="">Select a color</label>
          <input type="color" ref={colorRef} disabled={!changeColor}/>
        </div>
        {
          errorMessage&&
          <p className={style.errorMesg}>{errorMessage}</p>
        }
        <div className={style.submit}>
          <input type="submit" value='save'/>
        </div>
      </form>
      <div className={style.delete}>
        <button onClick={deleteCard}>Delete this card</button>
        <p className={`${style.warning} ${dark ? style.dark : style.light}`}>If you do so , all budgets will be set to 0</p>
      </div>
    </ModaleLayout>
  )
}
