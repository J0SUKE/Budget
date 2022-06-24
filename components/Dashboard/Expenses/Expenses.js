import { useContext, useState } from "react";
import style from '../Dashboard.module.scss';
import { ThemeCntxt } from "../../../Context/ThemeContext";
import Moment from 'react-moment';
import { colors } from "../../../utils/Colors";
import { getColor } from "../../../utils/Colors";

export default function Expenses({expenses}) {
    
    const {dark} = useContext(ThemeCntxt);

    return (
    <section className={`${style.expenses} ${dark ? style.dark : style.light}`}>
        <ul>
            {
              expenses.map(exp=>(
                <li key={exp.id}>
                  <div className={style.icon} style={{background:getColor(exp.budget,0.2)}}>
                    {
                      colors[exp.budget] ?
                      <img src={`/images/icons/${exp.budget}.svg`} alt=""/>
                      :
                      <img src={`/images/icons/perso.svg`} alt=""/>
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
                    <p>{exp.sum>0 ? '+' : '-'} $ {Math.abs(exp.sum)}</p>
                  </div>
                </li>
              ))
            }
        </ul>
    </section>
  )
}
