import { useContext, useState } from "react";
import style from '../Dashboard.module.scss';
import { ThemeCntxt } from "../../../Context/ThemeContext";
import Moment from 'react-moment';

export default function Expenses({expenses}) {
    
    const {dark} = useContext(ThemeCntxt);
    const [expensesInput,setExpensesInput] = useState({name:"",sum:"",time:""});

    return (
    <section className={`${style.expenses} ${dark ? style.dark : style.light}`}>
        <ul>
            {
              expenses.map(exp=>(
                <li key={exp.id}>
                  <div className={style.icon}>

                  </div>
                  <div className={style.info}>
                    <h4 className={`${dark ? style.dark : style.light}`}>{exp.name}</h4>
                    <div>
                        <div className={style.budget}>
                            Bills
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
