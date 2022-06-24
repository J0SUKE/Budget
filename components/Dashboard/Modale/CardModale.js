import ModaleLayout from './ModaleLayout';
import { setDoc,collection,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useRef } from 'react';
import {userContext} from "../../../Context/UserContext";
import { useContext } from "react";

export default function CardModale({setCardsModale,setCards}) {
    
    
    const {user} = useContext(userContext);
    
    const nameInput = useRef();
    const balanceInput = useRef();
    const colorInput = useRef();

    function addCard(e) {
        e.preventDefault();

        let expDoc = setDoc(doc(collection(db,`users/${user.uid}/cards`),`${nameInput.current.value}`),{
            name:nameInput.current.value,
            balance:balanceInput.current.value,
            color:colorInput.current.value,
            lastUse:new Date().getTime(),
            createdAt:new Date().getTime()  
          }).then((docRef)=>{
            console.log(docRef);
          }).then(()=>{
            setCards((cards)=>([
                {
                    name:nameInput.current.value,
                    balance:balanceInput.current.value,
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
        </form>
    </ModaleLayout>
  )
}
