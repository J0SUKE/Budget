import style from '../Dashboard.module.scss'
import { ThemeCntxt } from '../../../Context/ThemeContext'
import { useContext} from 'react';
import { useState } from 'react';
import {colors} from '../../../utils/Colors';
import { getColor } from '../../../utils/Colors';
import { abbreviateNumber } from "js-abbreviation-number";


export default function Budgets({setExpenseModale,layout,budgets,setBudgetsModale,setModifyBudgetModale}) {
    const {dark} = useContext(ThemeCntxt);
    const [seeAllBudgets,setSeeAllBudgets] = useState(false);

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
          {
            budgets.length>3 &&
            <button               
            onClick={()=>setSeeAllBudgets(seeAllBudgets=>!seeAllBudgets)}
          >{seeAllBudgets ? 'Minimize' : 'See all'}</button>
          }
          
        </div>
        <section>
          <ul>
              {
                budgets.map((item,index)=>{
                  if (seeAllBudgets) {
                    return (<Budget                                                                 
                                key={item.name} 
                                item={item}
                                setModifyBudgetModale={setModifyBudgetModale}
                      />)
                  }
                  if (index<3) 
                  {
                    return (<Budget 
                                key={item.name} 
                                item={item}
                                setModifyBudgetModale={setModifyBudgetModale}
                            />)
                  }
                })
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


function Budget({item,setModifyBudgetModale}) {
  
  const {dark} = useContext(ThemeCntxt);

  return (
    <li onClick={()=>setModifyBudgetModale(item)}>
      <div className={style.logo} style={{background:(item.color? `${item.color}33` : getColor(item.name,0.2,colors))}}>        
        {
          colors[item.name] &&
          <img src={`/images/icons/${item.name}.svg`} alt=""/>
        }
        
        <p style={{color:(item.color? item.color : getColor(item.name,1,colors))}}>{item.name}</p>
      </div>
      <div className={`${style.sum} ${dark ? style.dark : style.light}`}>
        <p>$ {abbreviateNumber(parseFloat(item.sum).toFixed(2), 2)}</p>
      </div>
    </li>
  )
}
