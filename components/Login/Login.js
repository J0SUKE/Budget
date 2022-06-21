import style from './Login.module.scss';
import Link from 'next/link';

export default function Login({connect,email,setEmail,password,setPassword,errorMessage}) {  
    return (
    <>
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
        <main className={style.content__container}>
            <div className={style.content}>
                <div className={style.content__left}>
                    <h2>New User ?</h2>
                    <p> Sign up for Budget and get more control over your payments in just a few minutes.</p>
                    <Link href={'/signup'}><button>Get Started</button></Link>
                </div>
                <div className={style.content__right}>
                    <div className={style.content__right__top}>
                        <h2>Log In</h2>
                        <button>Reset Password</button>
                    </div>
                    {
                        errorMessage &&
                        <label className={style.errorMesg}>
                            <p>{errorMessage}</p>
                        </label>            
                    }    
                    <form onSubmit={(e)=>connect(e)}>        
                        <div>
                            <label htmlFor="">Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                onInput={(e)=>setEmail(e.target.value)}
                                placeholder='email@example.com'
                            />            
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onInput={(e)=>setPassword(e.target.value)}
                                placeholder='Password'
                            />
                        </div>
                        <div>
                            <input type="submit" value='Log in'/>
                        </div>
                        </form>
                    </div>
            </div>
        </main>    
    </>
  )
}
