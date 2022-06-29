import style from '../Settings.module.scss';
import { useContext } from 'react';
import { ThemeCntxt } from '../../../Context/ThemeContext';

export default function SettingModaleLayout({children,addClass}) {
  
    const {dark} = useContext(ThemeCntxt);
  
    return (
      <div 
        className={`${style.modale} ${dark ? style.dark : style.light} ${addClass && addClass }`}
      >
        {children}
      </div>
    )
  }