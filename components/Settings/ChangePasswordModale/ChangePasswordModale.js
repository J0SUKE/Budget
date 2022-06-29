import {ThemeCntxt} from "../../../Context/ThemeContext";
import { useState,useContext,useRef } from "react";
import SettingModaleLayout from "../SettingModaleLayout/SettingModaleLayout";
import style from '../Settings.module.scss';    

export default function ChangePasswordModale({changepassword,newPasswordRef,currentPasswordRef,setPasswordChangeModale,setSuccesPasswordModale}) 
{
  const {dark} = useContext(ThemeCntxt); 
  const [errorMessage,setErrorMessage] = useState();
  const confirmPasswordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    if (newPasswordRef.current.value.length<6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    if (newPasswordRef.current.value!=confirmPasswordRef.current.value) {
      setErrorMessage('Your new password does not match.');
      return;
    }

    changepassword(e,setErrorMessage,setPasswordChangeModale,setSuccesPasswordModale);
  }
  
  return (
    <SettingModaleLayout>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${dark ? style.dark : style.light}`} htmlFor="">Old Password</label>
          <input 
            className={`${dark ? style.dark : style.light}`} 
            ref={currentPasswordRef} 
            type="password" 
            placeholder='Enter old password'/>
        </div>
        <div>
          <label className={`${dark ? style.dark : style.light}`} htmlFor="">New password</label>
          <input 
            className={`${dark ? style.dark : style.light}`}
            type="password" 
            placeholder='Enter new password'
            ref={newPasswordRef}
          />
        </div>
        <div>
          <label className={`${dark ? style.dark : style.light}`} htmlFor="">Repeat password</label>
          <input 
            className={`${dark ? style.dark : style.light}`} 
            type="password" 
            placeholder='Repeat new password'
            ref={confirmPasswordRef}
          />
        </div>
        {
          errorMessage && <p className={style.errorMessage}>{errorMessage}</p>
        }
        <div className={style.submit}>
          <input type="submit" value={'Change password'}/>
        </div>
      </form>      
    </SettingModaleLayout>
  )
}

export function SuccesPasswordModale({setSuccesPasswordModale}) {
  
    const {dark} = useContext(ThemeCntxt); 
    
    return (
      <SettingModaleLayout addClass={style.confirmation}>
        <p className={`${style.passwordChandedP} ${dark ? style.dark : style.light}`}>Your new password has been saved.</p>
        <button 
          className={`${style.okay} ${dark ? style.dark : style.light}`}
          onClick={()=>setSuccesPasswordModale(false)}
        >Okay</button>
      </SettingModaleLayout>
    )
  } 