import style from './Login.module.scss';
import Link from 'next/link';
import { useRef, useState } from 'react';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import ButtonLoading from '../ButtonLoading/ButtonLoading';

export default function Login({connect,email,setEmail,password,setPassword,errorMessage,setErrorMessage,setUser,isLoading}) {  
    
    const emailRef = useRef();
    const passwordRef = useRef();
    
    function setFocus(ref) {
        ref.current.focus();
    }

    return (
    <LoginPageLayout>
        <div className={style.content__right}>
        <div className={style.content__right__top}>
            <h2>Log In</h2>
            <Link href={'/reset-password'}><button>Reset Password</button></Link>
        </div>
        {
            errorMessage &&
            <label className={style.errorMesg}>
                <p>{errorMessage}</p>
            </label>            
        }    
        <form onSubmit={(e)=>connect(e)}>        
            <EmailField
                setFocus={setFocus}
                emailRef={emailRef}
                email={email}
                setEmail={setEmail}
                placeholder={'email@example.com'}
            />
            <div 
                onClick={()=>setFocus(passwordRef)}
                className={style.input_field}
            >
                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    ref={passwordRef}
                    value={password} 
                    onInput={(e)=>setPassword(e.target.value)}
                    placeholder='Password'
                />
            </div>
            <section>
                {
                    isLoading ?
                    <ButtonLoading/>
                    :
                    <input type="submit" value='Log in'/>
                }
            </section>
            
        </form>
        <span>or</span>
        <GoogleAuth message={'Login with Google'} setUser={setUser} setErrorMessage={setErrorMessage}/>
        </div>
    </LoginPageLayout>
  )
}


export function LoginPageLayout({children}) {
    return (
        <>
        <LoginHeader/>
        <main className={style.content__container}>
            <div className={style.content}>
                <div className={style.content__left}>
                    <h2>New User ?</h2>
                    <p> Sign up for Budget and get more control over your payments in just a few minutes.</p>
                    <Link href={'/signup'}><button>Get Started</button></Link>
                    <div className={style.cards_container}>
                        <img src="/images/pre-signup-illustration.png" alt="" />
                    </div>
                </div>
                {children}
            </div>
        </main>    
    </>
    )   
}

export function LoginHeader() {
    return (
        <header>
            <div className={style.header}>
                <Link href={'/'}>
                    <div className={style.logo}>
                        <p>B</p>
                        <p>udget</p>
                    </div>
                </Link>
            </div>
        </header>
    )
}

export function EmailField({setFocus,emailRef,email,setEmail,placeholder}) 
{
    return (
        <div 
            onClick={()=>{setFocus(emailRef)}}
            className={style.input_field}
        >
            <label htmlFor="">Email</label>
            <input 
                type="text" 
                ref={emailRef}
                value={email} 
                onInput={(e)=>setEmail(e.target.value)}
                placeholder={placeholder}
            />            
        </div>       
    )
}