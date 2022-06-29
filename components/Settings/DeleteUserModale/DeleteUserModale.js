import {ThemeCntxt} from "../../../Context/ThemeContext";
import { useState,useContext } from "react";
import SettingModaleLayout from "../SettingModaleLayout/SettingModaleLayout";
import style from '../Settings.module.scss';    

export default function DeleteUserModale({deleteAccountEmailRef,deleteAccountPasswordRef,clearUser,setDeleteUserModale}) {
  
    const {dark} = useContext(ThemeCntxt);
    const [errorMessage,setErrorMessage] = useState(null);
  
    function handleSubmit(e) {
      e.preventDefault();
      clearUser(e,setErrorMessage); 
    }
  
  
    return(
      <SettingModaleLayout addClass={style.delete_modale}>
      <p className={style.delete_p}>This action cannot be undone. This will permanently delete your entire account.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${dark ? style.dark : style.light}`} htmlFor="">Email</label>
          <input 
            type="email" 
            placeholder='Email'
            ref={deleteAccountEmailRef} 
            className={`${dark ? style.dark : style.light}`}/>
        </div>
        <div>
          <label className={`${dark ? style.dark : style.light}`} htmlFor="">Password</label>
          <input 
            type="password" 
            ref={deleteAccountPasswordRef} 
            className={`${dark ? style.dark : style.light}`}
            placeholder='Password'
          />
        </div>
        {
          errorMessage && <p className={style.errorMessage}>{errorMessage}</p>
        }
        <div className={style.delete_btn}>
          <input  type="submit" value={'Permanently delete account'}/>
        </div>
      </form>
      <button 
        className={`${dark ? style.dark : style.light}`}
        onClick={()=>setDeleteUserModale(false)}
      >Cancel</button>
    </SettingModaleLayout>
    )
  }