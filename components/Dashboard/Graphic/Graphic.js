import React, { useContext } from 'react'
import style from '../Dashboard.module.scss';
import { ThemeCntxt } from '../../../Context/ThemeContext';

export default function Graphic() {
  
  const {dark} = useContext(ThemeCntxt);

  return (
    <div className={style.stats_zone}>
      <h2 className={`${dark ? style.dark : style.light}`}><strong>Expense</strong> Activity</h2>
      <div className={style.stats}>
      </div>
    </div>
  )
}
