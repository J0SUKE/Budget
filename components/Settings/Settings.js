import style from './Settings.module.scss';
import { userContext } from '../../Context/UserContext';
import { useContext, useEffect, useState } from 'react';
import {ThemeCntxt} from '../../Context/ThemeContext'
import ChangeEmailModale from './EmailModale/ChangeEmailModale';
import ChangePasswordModale from './ChangePasswordModale/ChangePasswordModale';
import {SuccesPasswordModale} from './ChangePasswordModale/ChangePasswordModale';
import DeleteUserModale from './DeleteUserModale/DeleteUserModale';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Settings(
    {emailInput,passwordRef,newPasswordRef,currentPasswordRef,deleteAccountEmailRef,deleteAccountPasswordRef,changeEmail,changepassword,logOut,clearUser,sendResetLink}) 
{
  const {user} = useContext(userContext);
  const {dark} = useContext(ThemeCntxt);

  // modales
  const [emailChangeModale,setEmailChangeModale] = useState(false);
  const [passwordChangeModale,setPasswordChangeModale] = useState(false);
  const [succesPasswordModale,setSuccesPasswordModale] = useState(false);
  const [deleteUserModale,setDeleteUserModale] = useState(false);

  // router
  const router = useRouter();
  const [settingSection,setSettingSection] = useState(null);
  useEffect(()=>{
    setSettingSection(router.asPath.split('#')[1]);
  },[router])

  //mobile lateral menu
  const [mobileLayout,setMobilelayout] = useState(window.innerWidth<=820);
  const [menuActive,setMenuActive] = useState(false);
  
  useEffect(()=>{
    window.addEventListener('resize',()=>{
      if (window.innerWidth<=820) setMobilelayout(true);
      else setMobilelayout(false);
    })
    
  },[])

  return (
    <>
      {
        (emailChangeModale || passwordChangeModale || succesPasswordModale || deleteUserModale || menuActive) &&
        <>
          <div 
            className={style.layer}
            onClick={()=>{
              setEmailChangeModale(false);
              setPasswordChangeModale(false);
              setSuccesPasswordModale(false);
              setDeleteUserModale(false);
              setMenuActive(false);
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

      <LateralMenu settingSection={settingSection} menuActive={menuActive} setMenuActive={setMenuActive}/>

      {
        mobileLayout &&
        <button 
          className={style.mobile_menu}
          onClick={()=>setMenuActive(true)}
        ></button>
      }

      <main className={`${style.content} ${dark ? style.dark : style.light}`}>
      {
        settingSection=='account' ?
        <AccountSection
          setEmailChangeModale={setEmailChangeModale}
          setPasswordChangeModale={setPasswordChangeModale}
          logOut={logOut}
          setDeleteUserModale={setDeleteUserModale}
        />
        :
        <SettingSection/>
      }
      
      </main>
    </>
  )
}


function LateralMenu({settingSection,menuActive,setMenuActive}) {
  
  const {user} = useContext(userContext);
  const {dark} = useContext(ThemeCntxt);

  const router = useRouter();

  useEffect(()=>{
    setMenuActive(false);
  },[router])

  return (
    <div className={`${style.lateral_menu} ${dark ? style.dark : style.light} ${menuActive && style.active}`}>
        <p className={`${dark ? style.dark : style.light}`}>{user?.email}</p>
        <ul>
          <li className={`${dark ? style.dark : style.light} ${settingSection=='account' && style.active}`}>
            <Link href={'/settings#account'}>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={`${dark ? '#f8f8f8' : '#202020'}`} d="M20,8.18V3a1,1,0,0,0-2,0V8.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V13.82a3,3,0,0,0,0-5.64ZM19,12a1,1,0,1,1,1-1A1,1,0,0,1,19,12Zm-6,2.18V3a1,1,0,0,0-2,0V14.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V19.82a3,3,0,0,0,0-5.64ZM12,18a1,1,0,1,1,1-1A1,1,0,0,1,12,18ZM6,6.18V3A1,1,0,0,0,4,3V6.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V11.82A3,3,0,0,0,6,6.18ZM5,10A1,1,0,1,1,6,9,1,1,0,0,1,5,10Z"/></svg>
                <p>My account</p>
              </a>
            </Link>
          </li>
          <li className={`${dark ? style.dark : style.light} ${settingSection=='settings' && style.active}`}>
            <Link href={'/settings#settings'}>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill={`${dark ? '#f8f8f8' : '#202020'}`} d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>
                <p>Settings</p>
              </a>
            </Link>
          </li>
          <li className={`${dark ? style.dark : style.light}`}>
            <Link href={'/dashboard'}>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill={`${dark ? '#f8f8f8' : '#202020'}`} d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z"/></svg>
                <p>Dashboard</p>
              </a>
            </Link>
          </li>
        </ul>
      </div>
  )
}

function AccountSection({setEmailChangeModale,setPasswordChangeModale,logOut,setDeleteUserModale}) {
  const {user} = useContext(userContext);
  const {dark} = useContext(ThemeCntxt);
  
  return (
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
  )
}

function SettingSection() {
  const {dark,setDark} = useContext(ThemeCntxt);

  const [showmenu,setShowMenu] = useState(false);

  useEffect(()=>{
    document.body.addEventListener('click',()=>{
      setShowMenu(false);
    })
    document.body.addEventListener("keyup",(e)=>{
      if (e.key=='Escape') {
        setShowMenu(false);
      }
    })
  },[])

  return (
    <section>
      <h2 className={`${dark ? style.dark : style.light}`}>My settings</h2>
      <div className={style.theme_zone}>
        <div>
        <h3 className={`${dark ? style.dark : style.light}`}>Appearance</h3>
        <span className={`${dark ? style.dark : style.light}`}>Customize how Budget looks on your device.</span>
        </div>
        <div>
          <button 
            className={`${dark ? style.dark : style.light} ${showmenu && style.selected}`}
            onClick={(e)=>{
              e.stopPropagation();
              setShowMenu(true)
            }}
          >
            <p>{dark ? "Dark" : "Light"}</p>
            <span></span>
            {
              showmenu &&
              <menu className={`${dark ? style.dark : style.light}`}>
                <ul >
                  <li className={`${dark ? style.dark : style.light}`} onClick={()=>setDark(true)}>
                    <p>Dark</p>
                    {
                      dark && 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0092E4" d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"/></svg>
                    }
                    </li>
                  <li className={`${dark ? style.dark : style.light}`} onClick={()=>setDark(false)}>
                    <p>Light</p>
                    {
                      !dark &&
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#0092E4" d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"/></svg>
                    }
                  </li>
                </ul>
              </menu>
            }
          </button>
        </div>
      </div>
    </section>
  )
}