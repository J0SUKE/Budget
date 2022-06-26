import React, { useContext, useRef, useState } from 'react'
import ModaleLayout from './ModaleLayout'
import { doc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {userContext} from '../../../Context/UserContext';

export default function ModifyCardModale({modifyCardModale,setBudgets,setCards,cards,budgets,setModifyCardModale}) {

  const {user} = useContext(userContext);
    
  const balanceRef = useRef();
  const colorRef = useRef();
  const [changeColor,setChangeColor] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null)


  
  function modifyCard(e) {
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

    }).catch(error=>{
      // if not catched , an error will occur 
    })


  }


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
    <ModaleLayout>
      <form onSubmit={modifyCard}>
        <div>
          <label htmlFor="">Balance</label>
          <input type="number" step='0.01' ref={balanceRef}/>
        </div>
        <p>(if you modify the balance , all budgets will be set to 0)</p>
        <div>
          <label htmlFor="">Change the color ? </label>
          <input type="checkbox" onInput={()=>setChangeColor(change=>!change)}/>
          <input type="color" ref={colorRef} disabled={!changeColor}/>
        </div>
        <div>
          <input type="submit" value='save'/>
        </div>
      </form>
      <div>
        <button onClick={deleteCard}>Delete this card</button>
        <p>(if you do so , all budgets will be set to 0)</p>
      </div>
    </ModaleLayout>
  )
}
