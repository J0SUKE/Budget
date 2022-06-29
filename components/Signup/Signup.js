import GoogleAuth from '../GoogleAuth/GoogleAuth';
import {LoginHeader} from '../Login/Login';
import style from './Signup.module.scss';
import ButtonLoading from '../ButtonLoading/ButtonLoading';

export default function Signup({signIn,setEmail,email,password,setPassword,errorMessage,setUser,setErrorMessage,isLoading}) {
  return (
    <>
        <LoginHeader/>
        <main className={style.content}>
            <h2>Sign Up</h2>
            
            <form onSubmit={(e)=>signIn(e)}>
            {
                errorMessage &&
                <div className={style.errorMesg}>
                    <p>{errorMessage}</p>
                </div>
            }
            
            <div className={style.input_field}>
                <label htmlFor="">email</label>
                <input 
                    type="text" 
                    value={email} 
                    onInput={(e)=>setEmail(e.target.value)}
                    placeholder='Your Email Address'
            />            
            </div>
            <div className={style.input_field}>
                <label htmlFor="">password</label>
                <input 
                    type="password" 
                    value={password} 
                    onInput={(e)=>setPassword(e.target.value)}
                    placeholder='Something Secure'
                />
            </div>
            <GoogleAuth message={'Sign in with Google'} setErrorMessage={setErrorMessage} setUser={setUser}/>
            <section>
                {
                    isLoading?
                    <ButtonLoading/>
                    :
                    <input type="submit" value='Get Started'/>
                }
                
            </section>
        </form>
        </main>
    </>
  )
}