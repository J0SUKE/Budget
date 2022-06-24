import React, { useContext, useRef, useState } from 'react'
import ModaleLayout from './ModaleLayout'
import { addDoc,collection,updateDoc,doc  } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import {userContext} from '../../../Context/UserContext';
import moment from 'moment';

export default function ExpenseModale({setExpenses,budgets,setBudgets,cards}) 
{
    
    const {user} = useContext(userContext);
    const [errorMessage,setErrorMessage ]= useState(null);
    const nameRef = useRef();
    const sumRef = useRef();
    const budgetRef = useRef();
    const cardRef = useRef();    
    const dateRef = useRef();    

    function addExpense(e) {
        e.preventDefault();
        if (!checkInput({nameRef,sumRef,budgetRef,cardRef,dateRef},setErrorMessage,budgets,cards)) return;

        // promesse qui ajoute la depense dans la bdd puis met a jour le state

        let expDoc = addDoc(collection(db,`users/${user.uid}/expenses`),{
          name:nameRef.current.value,
          sum:sumRef.current.value,
          budget:budgetRef.current.value,
          time:dateRef.current.value,          
          createdAt:new Date().getTime()  
        }).then(docRef=>{
          
          setExpenses(exp=>[{
            name:nameRef.current.value,
            sum:sumRef.current.value,
            budget:budgetRef.current.value,
            time:dateRef.current.value,          
            id:docRef._key.path.segments[3]        
          },...exp])
        }).catch((error)=>{
          console.log(error);
        })

        
        let currentBdgt = budgets.filter(item=>item.name==budgetRef.current.value)[0];//budget actuel

        let budgetDoc = doc(db,`users/${user.uid}/budgets`,`${budgetRef.current.value}`)        
        
        // promesse qui met a jour le budget de la derniere depense

        let updateBudget = updateDoc(budgetDoc,{
          sum:parseFloat(currentBdgt.sum)+parseFloat(sumRef.current.value)
        }).then((docRef)=>{
          
          
          setBudgets(budgets=>budgets.map(item=>{
            if (item.name == budgetRef.current.value) {
              return ({
                name:budgetRef.current.value,
                sum:parseFloat(currentBdgt.sum)+parseFloat(sumRef.current.value),
              })
            }
            else return item;
          }))
        }).catch((error)=>{
          console.log(error);
        })
      } 

    return (
    <ModaleLayout>
        <form onSubmit={addExpense}>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" ref={nameRef}/>
            </div>
            <div>
                <label htmlFor="">Sum</label>
                <input type="number" step='0.01' ref={sumRef}/>
            </div>
            <div>
              <label htmlFor="">Budget</label>
              <input list="budgets" ref={budgetRef}/>
              <datalist id="budgets">
                {
                  budgets.map(item=>(
                    <option value={item.name}/>
                  ))
                }                              
              </datalist>
            </div>
            <div>
              <label htmlFor="">Card</label>
              <input list="cards" ref={cardRef}/>
              <datalist id="cards">
                {
                  cards.map(item=>(
                    <option value={item.name}/>
                  ))
                }                              
              </datalist>
            </div>
            <div>
                <label htmlFor="">Date</label>
                <input type="date" ref={dateRef}/>
            </div>
            <div>
                <input type="submit" value={'add'}/>
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


function checkInput(inputs,setErrorMessage,budgets,cards) 
{
  const{nameRef:{current:{value:name}},
  sumRef:{current:{value:sum}},
  budgetRef:{current:{value:budget}},
  cardRef:{current:{value:card}},
  dateRef:{current:{value:date}}} = inputs;
  
  if (name=="") {
    setErrorMessage('please set a name');
    return false;
  }

  //sum
  if (sum=="") {
    setErrorMessage('please set a value');    
    return false;
  }

  if (isNaN(sum)) {    
    setErrorMessage('please set a valid sum');    
    return false;
  }
  if (sum==0) {
    setErrorMessage('sum has to be different than 0');    
    return false;
  }

  // card
  if (budget=="") {
    setErrorMessage('please select a budget');
    return false;
  }
  if (budgets.filter(item=>item.name==budget).length==0) 
  {
    setErrorMessage('please select an existing budget');
    return false;
  }

  //card
  if (card=="") {
    setErrorMessage('please select a card');
    return false;
  }
  if (cards.filter(item=>item.name==card).length==0) 
  {
    setErrorMessage('please select an existing card');
    return false;
  }

  //date
  if (date=="") {
    setErrorMessage('please set a date');
    return false;
  }
  if (!moment(date, "MM/DD/YYYY", false).isValid()) {
    setErrorMessage('please set valid a date');
    return false;
  }
  

  
  return true;
}