import style from '../Dashboard.module.scss'
import { ThemeCntxt } from '../../../Context/ThemeContext'
import { useContext, useMemo } from 'react';
import { useState } from 'react';
import {colors} from '../../../utils/Colors';
import { getColor } from '../../../utils/Colors';


export default function Budgets({setExpenseModale,layout,budgets,setBudgetsModale}) {
    const {dark} = useContext(ThemeCntxt);
    const [expensesInput,setExpensesInput] = useState({name:"",sum:"",time:""});

    return (
    <aside className={`${style.budgets} ${layout} ${dark ? style.dark : style.light}`}>
      <img src="/images/make_it_rain.svg" alt="" />
      <button 
        className={style.add_exp}
        onClick={()=>setExpenseModale(true)}
      >+ Add an expense</button>
      <section className={style.budget_section}>
        <div className={`${dark ? style.dark : style.light}`}>
          <h2>Budgets</h2>
          <p>Decembre</p>
        </div>
        <section>
          <ul>
              {
                budgets.map(item=>(
                  <Budget name={item.name} sum={item.sum}/>
                ))
              }
          </ul>
        </section>
        <div 
          className={`${style.add_budget} ${dark ? style.dark : style.light}`}
          onClick={()=>setBudgetsModale(true)}
        >
            <p>+ Add new Budget</p>
        </div>
      </section>
    </aside>
  )
}


function Budget({name,sum}) {
  
  const {dark} = useContext(ThemeCntxt);

  return (
    <li>
      <div className={style.logo} style={{background:getColor(name,0.2,colors)}}>        
        {
          colors[name] ?
          <img src={`/images/icons/${name}.svg`} alt=""/>
          :
          <img src={`/images/icons/perso.svg`} alt=""/>
        }
        
        <p style={{color:getColor(name,1,colors)}}>{name}</p>
      </div>
      <div className={`${style.sum} ${dark ? style.dark : style.light}`}>
        <p>$ {parseFloat(sum).toFixed(2)}</p>
      </div>
    </li>
  )
}
