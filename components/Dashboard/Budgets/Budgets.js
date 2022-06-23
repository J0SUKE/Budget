import style from '../Dashboard.module.scss'
import { ThemeCntxt } from '../../../Context/ThemeContext'
import { useContext } from 'react'

export default function Budgets({expenseModale,setExpenseModale,layout}) {
    const {dark} = useContext(ThemeCntxt);

    return (
    <aside className={`${style.budgets} ${layout} ${dark ? style.dark : style.light}`}>
      <button 
        className={style.add_exp}
        onClick={()=>setExpenseModale(true)}
      >+ Add an expense</button>
    </aside>
  )
}
