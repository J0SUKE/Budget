import ModaleLayout from './ModaleLayout';
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useRef, useState } from 'react';
import {userContext} from "../../../Context/UserContext";
import { useContext } from "react";

export default function CardModale({setCardsModale,setCards,cards}) {
    
    
    const {user} = useContext(userContext);
    
    const nameInput = useRef();
    const balanceInput = useRef();
    const colorInput = useRef();

    const [errorMessage,setErrorMessage] = useState(null);

    function addCard(e) {
        e.preventDefault();

        if (!checkInput(
                nameInput.current.value,
                colorInput.current.value,
                balanceInput.current.value,
                setErrorMessage,
                cards)) return;

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
    }
  
    return (
    <ModaleLayout>
        <form onSubmit={addCard}>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" ref={nameInput}/>
            </div>
            <div>
                <label htmlFor="">Balance</label>
                <input type="number" step='0.01' ref={balanceInput}/>
            </div>
            <div>
                <label htmlFor="">Color</label>
                <input type="color" ref={colorInput}/>
            </div>
            <div>
                <input type="submit" value={'Add Card'}/>
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


function checkInput(name,color,sum,setErrorMessage,cards) {
    if (name=="") {
        setErrorMessage('Please set a name')
        return false;
    }
    if (cards.filter(item=>item.name==name).length==1) {
        setErrorMessage('This card already exists');
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

    return true;
}