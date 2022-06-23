import style from '../Dashboard.module.scss';
import {ThemeCntxt} from '../../../Context/ThemeContext';
import { useContext } from 'react';

export default function Header({visible,setVisible}) {
  const {dark} = useContext(ThemeCntxt);
  
  return (
    <header>
        <div className={`${style.header} ${dark ? style.dark:style.light}`}>
            <button className={`${style.hamburger} ${dark ? style.dark:style.light}`}  onClick={()=>setVisible(true)}>
                <div></div><div></div><div></div>
            </button>
        </div>
    </header>
  )
}
