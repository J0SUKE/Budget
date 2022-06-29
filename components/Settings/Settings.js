import style from './Settings.module.scss';
import { userContext } from '../../Context/UserContext';
import { useContext, useRef, useState } from 'react';
import {ThemeCntxt} from '../../Context/ThemeContext'
import ChangeEmailModale from './EmailModale/ChangeEmailModale';
import ChangePasswordModale from './ChangePasswordModale/ChangePasswordModale';
import {SuccesPasswordModale} from './ChangePasswordModale/ChangePasswordModale';
import DeleteUserModale from './DeleteUserModale/DeleteUserModale';

export default function Settings(
    {emailInput,passwordRef,newPasswordRef,currentPasswordRef,deleteAccountEmailRef,deleteAccountPasswordRef,changeEmail,changepassword,logOut,clearUser,sendResetLink}) 
{
  const {user} = useContext(userContext);
  const {dark,setDark} = useContext(ThemeCntxt);

  // modales
  const [emailChangeModale,setEmailChangeModale] = useState(false);
  const [passwordChangeModale,setPasswordChangeModale] = useState(false);
  const [succesPasswordModale,setSuccesPasswordModale] = useState(false);
  const [deleteUserModale,setDeleteUserModale] = useState(false);

  return (
    <>
      {
        (emailChangeModale || passwordChangeModale || succesPasswordModale || deleteUserModale) &&
        <>
          <div 
            className={style.layer}
            onClick={()=>{
              setEmailChangeModale(false);
              setPasswordChangeModale(false);
              setSuccesPasswordModale(false);
              setDeleteUserModale(false);
            }}
          ></div>
        </>
      }
      {emailChangeModale && <ChangeEmailModale 
      changeEmail={changeEmail} emailInput={emailInput} passwordRef={passwordRef} user={user}/>}
      
      {passwordChangeModale && <ChangePasswordModale 
        changepassword={changepassword} 
        currentPasswordRef={currentPasswordRef} 
        newPasswordRef={newPasswordRef}
        setPasswordChangeModale={setPasswordChangeModale}
        setSuccesPasswordModale={setSuccesPasswordModale}
      />}

      {
        succesPasswordModale && <SuccesPasswordModale setSuccesPasswordModale={setSuccesPasswordModale}/>
      }
      {
        deleteUserModale && <DeleteUserModale 
        deleteAccountEmailRef={deleteAccountEmailRef} deleteAccountPasswordRef={deleteAccountPasswordRef} clearUser={clearUser} setDeleteUserModale={setDeleteUserModale}/>
      }

      <div className={`${style.lateral_menu} ${dark ? style.dark : style.light}`}></div>
      <main className={`${style.content} ${dark ? style.dark : style.light}`}>
      <button className={style.theme_btn} onClick={()=>setDark(dark=>!dark)}>toggle</button>
      <section>
        <h2 className={`${dark ? style.dark : style.light}`}>Account</h2>
        <div>
          <h3 className={`${dark ? style.dark : style.light}`}>Personal info</h3>
          <div>
            <span className={`${dark ? style.dark : style.light}`}>Email</span>
            <div className={style.email_zone}>
              <p className={`${dark ? style.dark : style.light}`}>{user?.email}</p>
              <button 
                className={`${dark ? style.dark : style.light}`}
                onClick={()=>setEmailChangeModale(true)}
              >Change email</button>
            </div>
          </div>
        </div>
        <div className={`${style.password_zone} ${dark ? style.dark : style.light}`}>
          <h3 className={`${dark ? style.dark : style.light}`}>Password</h3>
          <button 
            className={`${style.btn} ${dark ? style.dark : style.light}`}
            onClick={()=>setPasswordChangeModale(true)}
          >Change password</button>
        </div>
        <div className={`${style.logout_zone} ${dark ? style.dark : style.light}` }>
          <h3 className={`${dark ? style.dark : style.light}`}>Log out</h3>  
          <button 
            className={`${style.btn} ${style.btn_danger}`}
            onClick={logOut}
          >Log out</button>
        </div>
        <div>
          <h3 className={`${dark ? style.dark : style.light}`}>Danger zone</h3>
          <button 
            className={`${style.btn} ${style.btn_danger}`}
            onClick={()=>setDeleteUserModale(true)}
          >Delete my account</button>
        </div>
      </section>          
      </main>
    </>
  )
}
