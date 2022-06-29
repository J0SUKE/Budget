import { useContext, useState } from "react";
import style from '../Dashboard.module.scss';
import { ThemeCntxt } from "../../../Context/ThemeContext";
import Moment from 'react-moment';
import { colors } from "../../../utils/Colors";
import { getColor } from "../../../utils/Colors";
import { abbreviateNumber } from "js-abbreviation-number";

export default function Expenses({expenses,expensesContainer}) {
    
    const {dark} = useContext(ThemeCntxt);

    return (
    <div className={style.expenses_zone}>
      <h2 className={`${dark ? style.dark : style.light}`}><strong>Expense</strong> History</h2>
      <section className={`${style.expenses} ${dark ? style.dark : style.light}`}>
          {
            expenses.length==0 ?
            <p className={`${dark ? style.dark : style.light}`}>You haven&apos;t added any expense yet</p>
            :
            <ul ref={expensesContainer}>
              {
                expenses.map(exp=>(
                  <li key={exp.id}>
                    <div className={style.icon} style={{background:(exp.color ? `${exp.color}33` : getColor(exp.budget,0.2))}}>
                      {
                        colors[exp.budget] ?
                        <img src={`/images/icons/${exp.budget}.svg`} alt=""/>
                        :
                        <div>
                          <p style={{color:exp.color}}>{exp.budget[0]}</p>
                        </div>
                      }
                    </div>
                    <div className={style.info}>
                      <h4 className={`${dark ? style.dark : style.light}`}>{exp.name}</h4>
                      <div>
                          <div className={style.budget}>
                              {exp.budget}
                          </div>
                          <div className={style.date}>
                              <Moment format="DD MMM YYYY">{exp.time}</Moment> 
                          </div>                        
                      </div>
                    </div>
                    <div className={`${style.price} ${exp.sum>0 ? style.gain : style.loss}`}>
                      <p>{exp.sum>0 ? '+' : '-'} $ {abbreviateNumber((Math.abs(exp.sum)),2)}</p>
                    </div>
                  </li>
                ))
              }
          </ul>
          }
          
      </section>
    </div>
  )
}
