import style from './Settings.module.scss';
import { userContext } from '../../Context/UserContext';
import { useContext, useRef, useState } from 'react';
import {ThemeCntxt} from '../../Context/ThemeContext'

export default function Settings(
    {emailInput,passwordRef,newPasswordRef,currentPasswordRef,deleteAccountEmailRef,deleteAccountPasswordRef,changeEmail,changepassword,logOut,clearUser,sendResetLink}) 
{
  const {user} = useContext(userContext);
  const {dark,setDark} = useContext(ThemeCntxt);

  // modales
  const [emailChangeModale,setEmailChangeModale] = useState(false);
  const [passwordChangeModale,setPasswordChangeModale] = useState(false);
  const [succesPasswordModale,setSuccesPasswordModale] = useState(false);

  return (
    <>
      {
        (emailChangeModale || passwordChangeModale || succesPasswordModale) &&
        <>
          <div 
            className={style.layer}
            onClick={()=>{
              setEmailChangeModale(false);
              setPasswordChangeModale(false);
              setSuccesPasswordModale(false);
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
            <div className={style.name_zone}>
              <span className={`${dark ? style.dark : style.light}`}>Preferred name</span>
              <input 
                type="text" 
                className={`${dark ? style.dark : style.light}`}
              />
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
          >Delete my account</button>
        </div>
      </section>      
      {/* <div>
        <h2>Change email</h2>
        <form onSubmit={changeEmail}>
          <label htmlFor="">Email</label>
          <input type="text" ref={emailInput}/>
          <input type="submit" value='change'/>
          <input type="password" ref={passwordRef}/>
        </form>
      </div>      
      <div>
        <h2>Change password</h2>
        <form onSubmit={changepassword}>
          <label htmlFor="">Current password</label>
          <input type="password" ref={currentPasswordRef}/>
          <label htmlFor="">New password</label>
          <input type="password" ref={newPasswordRef}/>
          <input type="submit" value='change'/>
          <div>
            <p>If you forgot your password, you can send a reset Link</p>
            <button onClick={sendResetLink}>reset my password</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Delete my account</h2>
        <form onSubmit={clearUser}>
          <div>
            <label htmlFor="">email</label>
            <input type="email" ref={deleteAccountEmailRef}/>
          </div>
          <div>
            <label htmlFor="">password</label>
            <input type="password" ref={deleteAccountPasswordRef}/>
          </div>
          <input type="submit" value='Delete my account'/>
        </form>
      </div> */}
      </main>
    </>
  )
}

function SettingModaleLayout({children,addClass}) {
  
  const {dark} = useContext(ThemeCntxt);

  return (
    <div 
      className={`${style.modale} ${dark ? style.dark : style.light} ${addClass && addClass }`}
    >
      {children}
    </div>
  )
}

function ChangeEmailModale({user,emailInput,passwordRef,changeEmail}) {
  
  const {dark} = useContext(ThemeCntxt);
  const [errorMessage,setErrorMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    changeEmail(e,setErrorMessage);
  }

  return (
    <SettingModaleLayout>
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
        <input className={style.submit} type="submit" value={'Send verification code'}/>
      </form>      
    </SettingModaleLayout>
  )
}

function ChangePasswordModale({changepassword,newPasswordRef,currentPasswordRef,setPasswordChangeModale,setSuccesPasswordModale}) 
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
        <input className={style.submit} type="submit" value={'Change password'}/>
      </form>      
    </SettingModaleLayout>
  )
}

function SuccesPasswordModale({setSuccesPasswordModale}) {
  
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