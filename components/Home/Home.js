import styles from './Home.module.scss';
import Header from '../Header/Header';
import Link from 'next/link';
import { userContext } from '../../Context/UserContext';
import { useContext, useEffect, useRef, useState} from 'react';
import Bubbles from './Bubbles/Bubbles';

export default function Home() {
  
  const {user} = useContext(userContext);
  
  return (
    <>
      <Header/>
      <section className={styles.hero}>
        <div className={styles.hero__left}>
          <h1>Regain control over your spending</h1>
          <p>Budget gives you control over how much you can spend for each category that you define yourself.It helps you visualize the evolution of your wallet by splitting it into different budgets. Create cards and budgets. Set spend limits and delete cards any time you want.</p>
          <Link href={user ? '/dashboard' :'/login'}>
            <a><button className={styles.button}>Get Started</button></a>
          </Link>          
        </div>  
        
        <div className={styles.hero__right}>
        <div className={styles.illustration}>
                <div className={styles.card} id={styles.card1}>
                    <div className={styles.card_sim}></div>
                    <div className={styles.card_title}></div>
                    <div className={styles.card_name}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={styles.card} id={styles.card2}>
                    <div className={styles.card_sim}></div>
                    <div className={styles.card_title}></div>
                    <div className={styles.card_name}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={styles.card} id={styles.card3}>
                    <div className={styles.card_sim}></div>
                    <div className={styles.card_title}></div>
                    <div className={styles.card_name}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={styles.illustration__logo}>B</div>
            </div>
        </div>
      </section>
      <section className={styles.details}>
        <div className={styles.details__top}>
          <h2>Take Control of Your Expenses</h2>
          <Link href={user ? '/dashboard' :'/login'}><a><button className={styles.button}>Try Budget Today</button></a></Link>          
        </div>
        <div className={styles.details__content}>
              <div>
                <section>
                  <h3>Convenient and Easy to Use</h3>
                  <p>Budget has a simple and intuitive interface designed to help you focus on what's important.No useless options or complex features, only the essentials to quickly achieve what you need.</p>
                </section>
                <img src="/images/split-landing-hero-extension.webp" alt="" />
              </div>              
              <div>                
                <section>
                  <h3>Monitor your spend</h3>
                  <p>Creating a budget for each service you subscribed to is insanely helpful to visualize how much is left for you to spend on other things ! You will no longer worry about going beyond your global budget</p>
                </section>
                <Bubbles/>
              </div>
              <div>
                <section>
                  <h3>Intuitive wallet organisation</h3>
                  <p>Budget prevent you from allowing to a service more money than what you have ,thus sparing you unexpected calls from your banker.</p>
                </section>
                <div className={`${styles.details__content__illustration} ${styles.spend_limit}`}>
                  <div className={styles.expenses_wrapper}>
                    <div className={styles.expense} id={styles.apple}>
                      <div className={styles.expense__left}>
                        <img src="/images/apple.svg" alt="" />
                        <div>
                          <span>Approved</span>
                          <p>$ 130.99</p>
                        </div>
                        
                      </div>
                      <p>2 min ago</p>
                    </div>
                    <div className={styles.expense} id={styles.netflix}>
                      <div className={styles.expense__left}>
                        <img src="/images/netflix.svg" alt="" />
                        <div>
                          <span>Approved</span>
                          <p>$ 13.99</p>
                        </div>
                        
                      </div>
                      <p>6 min ago</p>
                    </div>
                    <div className={styles.expense} id={styles.starbucks}>
                      <div className={styles.expense__left}>
                        <img src="/images/starbucks.svg" alt="" />
                        <div>
                          <span>Rejected</span>
                          <p>$ 42.23</p>
                        </div>
                        
                      </div>
                      <p>7 min ago</p>
                    </div>

                  </div>
                  <div className={styles.card}>
                    <h5>Profesional account</h5>
                    <h4>$ 150
                      <img src="/images/icons/bank.svg" alt="" />
                    </h4>
                    <h6>23 06</h6>
                  </div>
                </div>
              </div>
              <div>
                <section>
                  <h3>Keep an eye on your banking activity</h3>
                  <p>All your the expenses that you register are accessible on your dashboard without any time limit ,each expense is presented by name, price, date and budget.</p>
                </section>
                <img src="/images/how-it-works-4@2x.webp" alt="" />
              </div>
          </div>
      </section>
      <section className={styles.howItworks}>
        <div className={styles.howItworks__top}>
          <div>
            <h2>How It Works</h2>
            <p>Take back control of your money in a few simple steps.</p>
          </div>
          <Link href={user ? '/dashboard' :'/login'}><a><button className={styles.button}>Try Budget Today</button></a></Link>          
        </div>
        <HowItWorks/>
      </section>
    </>    
  )
}


function HowItWorks() {
  
  const [current,setCurrent] = useState(1);
  const interval = useRef();

  function selectListItem(index) {
    setCurrent(index);
    clearInterval(interval.current); 
    interval.current = setInterval(()=>{
      setCurrent(current=>{
        if (current==4) return 1;
        else return current + 1;
      });
    },7000);
  }

  useEffect(()=>{
    interval.current = setInterval(()=>{
      setCurrent(current=>{
        if (current==4) return 1;
        else return current + 1;
      });
    },7000);

    return ()=>clearInterval(interval.current);
    
  },[])

  return(
    <div className={styles.howItworks__content}>
          <ul className={styles.howItworks__content__left}>
              <li className={current==1 ? styles.active : ''} onClick={()=>selectListItem(1)}>
                <span>01</span>
                <p>Create at least one card and one budget to start registering expenses</p>
              </li>
              <li className={current==2 ? styles.active : '' } onClick={()=>{selectListItem(2)}}>
                <span>02</span>
                <p>Add as many budgets as you need and split your wallet over these different budgets  </p>
              </li>
              <li className={current==3 ? styles.active : '' } onClick={()=>{selectListItem(3)}}>
                <span>03</span>
                <p>Get a user friendly visual of all your expense activity with the corresponding data, sorted by time of creation</p>
              </li>
              <li className={current==4 ? styles.active : '' } onClick={()=>{selectListItem(4)}}>
                <span>04</span>
                <p>Track your spend in the Account Summary dashboard.</p>
              </li>
          </ul>
          <div className={styles.howItworks__content__right}>
              {
                current==1?
                <img src="/images/step1.png" alt="" />
                :
                current==2?
                <img src="/images/step2.png" alt="" />
                :
                current==3?
                <img src="/images/step3.png" alt="" />
                :
                <img src="/images/step4.png" alt="" />
              }
                            
          </div>
        </div>
  ) 
}