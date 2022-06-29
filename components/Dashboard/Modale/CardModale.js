import ModaleLayout from './ModaleLayout';
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useMemo, useRef, useState } from 'react';
import {userContext} from "../../../Context/UserContext";
import { useContext } from "react";
import { ThemeCntxt } from "../../../Context/ThemeContext";
import style from '../Dashboard.module.scss';

export default function CardModale({setCardsModale,setCards,cards}) {
    
    const {dark} = useContext(ThemeCntxt);
    const {user} = useContext(userContext);
    
    const nameInput = useRef();
    const balanceInput = useRef();
    const colorInput = useRef();

    const [errorMessage,setErrorMessage] = useState(null);

    const addCard = useMemo(()=>(e)=>{
        e.preventDefault();

        if (!checkInput(
                nameInput.current.value,
                colorInput.current.value,
                balanceInput.current.value,
                setErrorMessage,
                cards
            )) return;

        let expDoc = setDoc(doc(collection(db,`users/${user.uid}/cards`),`${nameInput.current.value}`),{
            name:nameInput.current.value,
            balance:parseFloat(balanceInput.current.value),
            color:colorInput.current.value,
            lastUse:new Date().getTime(),
            createdAt:new Date().getTime()  
          }).then((docRef)=>{
            console.log(docRef);
          }).then(()=>{
            setCards((cards)=>([
                {
                    name:nameInput.current.value,
                    balance:parseFloat(balanceInput.current.value),
                    color:colorInput.current.value,
                    lastUse:new Date().getTime(),
                    createdAt:new Date().getTime()  
                },...cards
            ]))
          })
          .catch((error)=>{
            console.log(error);
          })
    })
  
    return (
    <ModaleLayout topLeft={'Add a card'}>
        <form onSubmit={addCard}>
            <div className={`${style.input_field} ${dark ? style.dark : style.light}`}>
                <label htmlFor="">Name</label>
                <input type="text" ref={nameInput} placeholder='Personal card'/>
            </div>
            <div className={`${style.input_field} ${dark ? style.dark : style.light}`}>
                <label htmlFor="">Balance</label>
                <input type="number" step='0.01' ref={balanceInput} placeholder='1000.00'/>
            </div>
            <div className={`${style.color_field} ${dark ? style.dark : style.light}`}> 
                <label htmlFor="">Color</label>
                <input type="color" ref={colorInput}/>
            </div>
            <div className={style.errorMesg}>
                {
                    errorMessage && <p>{errorMessage}</p>
                }
            </div>
            <div className={style.submit}>
                <input type="submit" value={'Add Card'}/>
            </div>
        </form>
    </ModaleLayout>
  )
}


function checkInput(name,color,sum,setErrorMessage,cards) {
    if (name=="") {
        setErrorMessage('Please set a name')
        return false;
    }
    if (cards.filter(item=>item.name==name).length==1) {
        setErrorMessage('This card already exists');
        return false;
    }
    if (sum=="") {
        setErrorMessage('Please set a sum')
        return false;
    }
    if (isNaN(sum)) {
        setErrorMessage('Please set a valid sum');
        return false;
    }
    if (cards.filter(item=>item.color==color).length==1) {
        setErrorMessage('This color is already taken');
        return false;
    }
    
    setErrorMessage(null);
    return true;
}