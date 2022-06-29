import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { collection, orderBy,query, getDocs,startAfter, limit, doc  } from "firebase/firestore"; 
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
import BudgetModale from './Modale/BudgetModale';
import CardModale from './Modale/CardModale';
import Cards from './Cards/Cards';
import ModifyCardModale from './Modale/ModifyCardModale';
import ModifyBudgetModale from './Modale/ModifyBudgetModale';

export const ModaleContext = React.createContext();


export default function Dashboard() {  

  //contexts
  const {user,setUser} = useContext(userContext);
  const{setDark,dark} = useContext(ThemeCntxt);
  
  //router
  const router = useRouter();

  // firebase data
  const [expenses,setExpenses] = useState([]);
  const [budgets,setBudgets] = useState([]);
  const [cards,setCards] = useState([]);
  
  // lateral menu
  const [visible,setVisible] = useState(false);

  //hero data
  const [total,setTotal] = useState(0);
  const [loss,setLoss] = useState(0);
  const [gain,setGain] = useState(0);

  //modales 
  const [expenseModale,setExpenseModale] = useState(false);
  const [budgetsModale,setBudgetsModale] = useState(false);
  const [cardsModale,setCardsModale] = useState(false);
  const [modifyCardModale,setModifyCardModale] = useState(null);
  const [modifyBudgetModale,setModifyBudgetModale] = useState(null);
  
  //layout
  const [mobileLayout,setMobileLayout] = useState((window.innerWidth<=750));

  //expenses
  const lastVisible = useRef();
  const expensesContainer = useRef();

  function getExpenses() {
    const firstQuery = query(collection(db, `users/${user.uid}/expenses`),orderBy("createdAt","desc"),limit(7));
    

    let data = [];
    const docSnap = getDocs(firstQuery)
    .then(res=>{
      res.forEach(element => {
        data.push({
          ...element.data(),
          id:element._document.key.path.segments[8]
        })
      });

      lastVisible.current = res.docs[res.docs.length - 1];
    })
    .then(()=>{
      setExpenses([...data]);
    })
  }

  // get more data on scroll========================

  // load the data from firebase
  function LoadFirebaseExpensesOnScroll() {

      //d'abord on remove l'EventListener pour empecher qu'une autre instance ne se déclanche pendant l'exucution de cette fonction
      expensesContainer.current.removeEventListener('scroll',loadExpensesOnscroll);
      
      var LoadMore = query(collection(db,`users/${user.uid}/expenses`)
      ,orderBy("createdAt","desc")
      ,startAfter(lastVisible.current)//lastVisible.current est le dernier document chargé
      ,limit(7));

      let data = [];
      let getMoreData = getDocs(LoadMore)
      .then((res)=>{
                
        res.forEach(element => {
          data.push({
            ...element.data(),
            id:element._document.key.path.segments[8]
          })
        });

        lastVisible.current = res.docs[res.docs.length - 1]; // on update le dernier doc chargé

        return res
      }).then((res)=>{
        setExpenses(expenses=>[...expenses,...data]);
        
        if (res.docs.length!=0) // on renouvelle l'EventListener que si il reste des données
        {
          expensesContainer.current.addEventListener('scroll',loadExpensesOnscroll)
        }
        
      })
              
  }

  // call the LoadFirebaseExpensesOnScroll on scroll
  function loadExpensesOnscroll() {
    const scrollTop = expensesContainer.current.scrollTop;
    const scrollheight = expensesContainer.current.scrollHeight;
    const height = expensesContainer.current.getBoundingClientRect().height;

    if (scrollTop+height*1.2>=scrollheight) {
      LoadFirebaseExpensesOnScroll();    
    }
  }

  // add the event listener
  useEffect(()=>{      
      
    expensesContainer.current?.addEventListener('scroll',loadExpensesOnscroll)
    
  },[expensesContainer.current])

  //============================================

  function getBudgets() {
    const q = query(collection(db, `users/${user.uid}/budgets`),orderBy("lastUse","desc"));
    
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

  useEffect(()=>{
    //calcul du total
    let tot = 0;
      cards.forEach(element => {
        tot+=parseFloat(element.balance);
      });
      setTotal(tot);
  },[cards])


    return (
    <>
        <Header visible={visible} setVisible={setVisible}/>
        <LateralMenu visible={visible} setVisible={setVisible}/>
        {
          // dans le cas du layout de Desktop la colonne de droite (Budgets) aura un layout desktop
          !mobileLayout &&
          <Budgets 
            expenseModale={expenseModale} 
            layout={style.desktop} 
            setExpenseModale={setExpenseModale}
            budgets={budgets}
            budgetsModale={budgetsModale}
            setBudgetsModale={setBudgetsModale}
            setModifyBudgetModale={setModifyBudgetModale}
          />
        }
        
        
        {visible && <div className={style.overlay} onClick={()=>setVisible(false)}></div>}
        {(expenseModale || budgetsModale || cardsModale || modifyCardModale || modifyBudgetModale) && 
          <div className={style.overlay} 
            onClick={()=>{
              setExpenseModale(false)
              setBudgetsModale(false)
              setCardsModale(false);
              setModifyCardModale(null);
              setModifyBudgetModale(null);
            }}></div>
        }        


        <ModaleContext.Provider 
          value={{setExpenseModale,setBudgetsModale,setCardsModale,setModifyCardModale,setModifyBudgetModale}}
        >          
          {
            expenseModale && 
            <ExpenseModale 
              setExpenses={setExpenses} 
              budgets={budgets} 
              setBudgets={setBudgets} 
              cards={cards} 
              setCards={setCards}
              setExpenseModale={setExpenseModale}
            />
          }
          
          {
            budgetsModale && 
            <BudgetModale 
                setBudgets={setBudgets} 
                budgets={budgets} 
                cards={cards} 
                total={total}
                setBudgetsModale={setBudgetsModale}
            />
          }

          {
          cardsModale && 
          <CardModale 
              setCardsModale={setCardsModale} 
              setCards={setCards} 
              cards={cards}
          />
          }
          
          {
            modifyCardModale &&
            <ModifyCardModale 
                modifyCardModale={modifyCardModale} 
                cards={cards} 
                setCards={setCards} 
                setBudgets={setBudgets} 
                budgets={budgets} 
                setModifyCardModale={setModifyCardModale}
            />
          }

          {
            modifyBudgetModale &&
            <ModifyBudgetModale 
              modifyBudgetModale={modifyBudgetModale} 
              budgets={budgets} 
              setBudgets={setBudgets} 
              total={total} 
              setModifyBudgetModale={setModifyBudgetModale}
            />
          }
        </ModaleContext.Provider>
        

        <div className={`${style.main} ${dark ? style.dark : style.light}`}>
          <Hero 
              setCardsModale={setCardsModale} 
              cards={cards} 
              expenses={expenses} 
              setLoss={setLoss} 
              setGain={setGain}
              loss={loss}
              gain={gain}
              total={total}
              setTotal={setTotal}
          />
          <div className={style.data_zone}>
            <Expenses expenses={expenses} expensesContainer={expensesContainer}/>
            <Cards cards={cards} setModifyCardModale={setModifyCardModale}/>
            {
              // dans le cas du layout de Desktop la colonne de droute (Budgets) aura un layout mobile 
              mobileLayout &&
              <Budgets 
                expenseModale={expenseModale} 
                layout={style.mobile} 
                setExpenseModale={setExpenseModale}
                budgets={budgets}
                budgetsModale={budgetsModale}
                setBudgetsModale={setBudgetsModale}
                setModifyBudgetModale={setModifyBudgetModale}
              />
            }
          </div>
        </div>      
    </>
  )
}

