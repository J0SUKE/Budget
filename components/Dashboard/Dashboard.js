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

export default function Dashboard() {  

  const {user,setUser} = useContext(userContext);
  const router = useRouter();
  const [accountInput,setAccountInput] = useState({name:"",sum:0});
  const [expenses,setExpenses] = useState([]);
  const [visible,setVisible] = useState(false); // lateral menu
  const{setDark,dark} = useContext(ThemeCntxt);
  const [expenseModale,setExpenseModale] = useState(false);
  const [mobileLayout,setMobileLayout] = useState((window.innerWidth<=750));

  function logOut() 
  {
    window.localStorage.setItem('user',JSON.stringify(null));
    auth.signOut();
    router.push('/login');
  }

  function addAccount(e) {
    e.preventDefault();
    
    const docRef = addDoc(collection(db,`users/${user.uid}/accounts`),{
      name:accountInput.name,
      sum:accountInput.sum
    })    
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
      console.log(data);
      setExpenses([...data]);
    })
  }
  
  useEffect(()=>{
    getExpenses();

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
          <Budgets expenseModale={expenseModale} layout={style.desktop} setExpenseModale={setExpenseModale}/>
        }
                
        {visible && <div className={style.overlay} onClick={()=>setVisible(false)}></div>}
        {expenseModale && <div className={style.overlay} onClick={()=>setExpenseModale(false)}></div>}
        {expenseModale && <ExpenseModale setExpenses={setExpenses}/>}
        
        
        
        <div className={`${style.main} ${dark ? style.dark : style.light}`}>
          <Hero/>
          <div className={style.data_zone}>
            <Expenses expenses={expenses} />
            <Graphic/>
            {
              mobileLayout &&
              <Budgets expenseModale={expenseModale} layout={style.mobile} setExpenseModale={setExpenseModale}/>
            }
          </div>
        </div>      
    </>
  )
}

