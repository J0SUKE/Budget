import Link from "next/link";
import { useContext, useState } from "react";
import {userContext} from '../../../Context/UserContext';
import {ThemeCntxt} from '../../../Context/ThemeContext';
import style from '../Dashboard.module.scss';   

export default function LateralMenu({visible,setVisible}) {
  
    const {user} = useContext(userContext);
    const {dark,setDark} = useContext(ThemeCntxt);
    
    return (
      <aside 
        className={`${style.lateral_menu} ${dark ? style.dark : style.light} ${visible ? style.visible : style.invisible}`}>
        <nav>
          <div className={style.lateral_menu__top}>
            <span className={`${dark ? style.dark : style.light}`}>{user.email[0]}</span>
            <p className={`${style.username} ${dark ? style.dark : style.light}`}>{user.email}</p>    
            <button onClick={()=>setVisible(false)}>
                <div></div>
                <div></div>
            </button>
          </div>
          <ul>
            <Link href={'/settings#account'}>
              <li className={`${dark ? style.dark : style.light}`}>
                  <img src="/images/user.svg" alt="" />
                  <p>My account</p>
              </li>
            </Link>
            <Link href={'/settings#settings'}>
              <li className={`${dark ? style.dark : style.light}`}>
                  <img src="/images/cog.svg" alt="" />
                  <p>Settings</p>
              </li>
            </Link>
            
          </ul>
        </nav>
      </aside>
    )
  }