import style from '../Dashboard.module.scss';
import {ThemeCntxt} from '../../../Context/ThemeContext';
import { useContext } from 'react';

import {ModaleContext} from '../Dashboard';

export default function ModaleLayout({children,topLeft}) {
  
  const {dark} = useContext(ThemeCntxt);
  const {setExpenseModale,setBudgetsModale,setCardsModale,setModifyCardModale,setModifyBudgetModale}= useContext(ModaleContext);


  function closeModale() {
    setExpenseModale(false)
    setBudgetsModale(false)
    setCardsModale(false);
    setModifyCardModale(null);
    setModifyBudgetModale(null);
  }

  return (
    <div className={`${style.modale} ${dark ? style.dark : style.light}`}>
        <div className={style.modale__top}>
          <p className={`${dark ? style.dark : style.light}`}>{topLeft}</p>
          <button onClick={closeModale}>+</button>
        </div>
        {children}
    </div>
  )
}
