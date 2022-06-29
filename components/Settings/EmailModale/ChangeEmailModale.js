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
          
          <p>Please enter a new email (you will be logged out after this operation)</p>
          
          <input 
            className={`${dark ? style.dark : style.light}`} 
            type="email" 
            placeholder='Enter new Email'
            ref={emailInput}
          />
          {
            errorMessage && <p className={style.errorMessage}>{errorMessage}</p>
          }
          <div className={style.submit}>
            <input type="submit" value={'Change my email'}/>
          </div>
        </form>      
      </SettingModaleLayout>
    )
  }