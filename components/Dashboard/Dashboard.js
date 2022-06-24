import {auth} from '../../firebase/firebase-config';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { collection, addDoc, orderBy,query, where, getDocs  } from "firebase/firestore"; 
import { db } from '../../firebase/firebase-config';
import {userContext} from '../../Context/UserContext';
import LateralMenu from './LateralMenu/LateralMenu';
import Header from './Header/Header';
import { ThemeCntxt } from '../../Context/ThemeContext';
import style from './Dashboard.module.scss'
import Budgets from './Budgets/Budgets';
import Hero from './Hero/Hero';
import Expenses from './Expenses/Expenses';
import ExpenseModale from './Modale/ExpenseModale';
import Graphic from './Graphic/Graphic';
import BudgetModale from './Modale/BudgetModale';
import CardModale from './Modale/CardModale';

export default function Dashboard() {  

  const {user,setUser} = useContext(userContext);
  const{setDark,dark} = useContext(ThemeCntxt);
  const router = useRouter();

  const [expenses,setExpenses] = useState([]);
  const [budgets,setBudgets] = useState([]);
  const [cards,setCards] = useState([]);
  
  const [visible,setVisible] = useState(false); // lateral menu
  
  //modales 
  const [expenseModale,setExpenseModale] = useState(false);
  const [budgetsModale,setBudgetsModale] = useState(false);
  const [cardsModale,setCardsModale] = useState(false);
  
  //layout
  const [mobileLayout,setMobileLayout] = useState((window.innerWidth<=750));

  function logOut() 
  {
    window.localStorage.setItem('user',JSON.stringify(null));
    auth.signOut();
    router.push('/login');
  }


  function getExpenses() {
    const q = query(collection(db, `users/${user.uid}/expenses`),orderBy("createdAt","desc"));
    

    let data = [];
    const docSnap = getDocs(q)
    .then(res=>{
      res.forEach(element => {
        data.push({
          ...element.data(),
          id:element._document.key.path.segments[8]
        })
      });
    })
    .then(()=>{
      setExpenses([...data]);
    })
  }
  function getBudgets() {
    const q = query(collection(db, `users/${user.uid}/budgets`),orderBy("createdAt","desc"));
    
    let data = [];
    const docSnap = getDocs(q)
    .then(res=>{
      res.forEach(element => {
        data.push({
          ...element.data(),
          id:element._document.key.path.segments[8]
        })
      });
    })
    .then(()=>{
      setBudgets([...data]);
    })
  }
  function getCards() {
    const q = query(collection(db, `users/${user.uid}/cards`),orderBy("lastUse","desc"));
    
    let data = [];
    const docSnap = getDocs(q)
    .then(res=>{
      res.forEach(element => {
        data.push({
          ...element.data(),
          id:element._document.key.path.segments[8]
        })
      });
    })
    .then(()=>{
      setCards([...data]);
    })
  }
  
  useEffect(()=>{
    getExpenses();
    getBudgets();
    getCards();
    window.addEventListener("resize",()=>{
      if (window.innerWidth<=750) setMobileLayout(true);
      else setMobileLayout(false);
    })
  },[])

    return (
    <>
        <button className={style.toggleTheme} onClick={()=>{setDark(dark=>!dark)}}>toggle</button>
        <Header visible={visible} setVisible={setVisible}/>
        <LateralMenu visible={visible} setVisible={setVisible}/>
        {
          !mobileLayout &&
          <Budgets 
            expenseModale={expenseModale} 
            layout={style.desktop} 
            setExpenseModale={setExpenseModale}
            budgets={budgets}
            budgetsModale={budgetsModale}
            setBudgetsModale={setBudgetsModale}
          />
        }
        
        
        {visible && <div className={style.overlay} onClick={()=>setVisible(false)}></div>}
        {(expenseModale || budgetsModale || cardsModale) && 
          <div className={style.overlay} 
            onClick={()=>{
              setExpenseModale(false)
              setBudgetsModale(false)
              setCardsModale(false);
            }}></div>
        }
        {expenseModale && 
        <ExpenseModale setExpenses={setExpenses} budgets={budgets} setBudgets={setBudgets} cards={cards}/>}
        
        {budgetsModale && <BudgetModale setBudgets={setBudgets}/>}

        {cardsModale && <CardModale setCardsModale={setCardsModale}/>}
        
        <div className={`${style.main} ${dark ? style.dark : style.light}`}>
          <Hero setCardsModale={setCardsModale} cards={cards}/>
          <div className={style.data_zone}>
            <Expenses expenses={expenses} />
            <Graphic/>
            {
              mobileLayout &&
              <Budgets 
                expenseModale={expenseModale} 
                layout={style.desktop} 
                setExpenseModale={setExpenseModale}
                budgets={budgets}
                budgetsModale={budgetsModale}
                setBudgetsModale={setBudgetsModale}
              />
            }
          </div>
        </div>      
    </>
  )
}

