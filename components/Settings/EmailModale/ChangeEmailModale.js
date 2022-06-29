import SettingModaleLayout from "../SettingModaleLayout/SettingModaleLayout";
import { ThemeCntxt } from "../../../Context/ThemeContext";
import { useContext,useState } from "react";
import style from '../Settings.module.scss';

export default function ChangeEmailModale({user,emailInput,passwordRef,changeEmail}) {
  
    const {dark} = useContext(ThemeCntxt);
    const [errorMessage,setErrorMessage] = useState();
  
    function handleSubmit(e) {
      e.preventDefault();
      changeEmail(e,setErrorMessage);
    }
  
    return (
      <SettingModaleLayout addClass={style.emailChange}>
        <p>Your current email is <strong>{user.email}</strong>.</p>
        <form onSubmit={handleSubmit}>
          <p>Please enter your password.</p>
          <input 
            className={`${dark ? style.dark : style.light}`}
            type="password" 
            placeholder='Password'
            ref={passwordRef}
          />
          
          <p>Please enter a new email and we will send you a verification code.</p>
          
          <input 
            className={`${dark ? style.dark : style.light}`} 
            type="email" 
            placeholder='Enter new Email'
            ref={emailInput}
          />
          {
            errorMessage && <p className={style.errorMessage}>{errorMessage}</p>
          }
          <input className={style.submit} type="submit" value={'Send verification code'}/>
        </form>      
      </SettingModaleLayout>
    )
  }