import styles from './Home.module.scss';
import Header from '../Header/Header';
import Link from 'next/link';
import { userContext } from '../../Context/UserContext';
import { useContext } from 'react';

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
                  <p>Save time at checkout with our browser extension. Create and auto-fill secure card numbers at checkout with a one-click experience.</p>
                </section>
                <img src="/images/split-landing-hero-extension.webp" alt="" />
              </div>              
              <div>                
                <section>
                  <h3>Monitor your spend</h3>
                  <p>Create a Spend Limit on each service to block hidden fees and double charges on recurring expenses. If a transaction goes over the limit, it will automatically decline.</p>
                </section>
                <div className={`${styles.details__content__illustration} ${styles.bubbles}`}>
                  <div className={styles.bubble} id={styles.bubble1}></div>
                  <section className={styles.bubble__content}>
                    <img src="/images/apple.svg" alt="" />
                    <p>$26.00/mo</p>
                  </section>  
                  <div className={styles.bubble} id={styles.bubble2}></div>
                  <section className={styles.bubble__content}>
                    <img src="/images/netflix.svg" alt="" />
                    <p>$30.00/mo</p>
                  </section>
                  <div className={styles.bubble} id={styles.bubble3}></div>
                  <section className={styles.bubble__content}>
                    <img src="/images/starbucks.svg" alt="" />
                    <p>$16.00/mo</p>
                  </section>
                </div>
              </div>
              <div>
                <section>
                  <h3>Intuitive wallet organisation</h3>
                  <p>Organize your virtual cards in one easy-to-use wallet. Tag each card for quick sorting and selection.</p>
                </section>
                <div className={`${styles.details__content__illustration} ${styles.spend_limit}`}>
                  <div className={styles.expenses_wrapper}></div>
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
                  <h3>Intuitive wallet organisation</h3>
                  <p>Set a spend limit on each transaction. Great for recurring payments or one-time purchases where cards need to be closed immediately after use.</p>
                </section>
                <img src="/images/how-it-works-2@2x.webp" alt="" />
              </div>
          </div>
      </section>
      <section className={styles.lastSection}>
        <div className={styles.lastSection__left}>
        </div>
        <div className={styles.lastSection__right}>

        </div>
      </section>
    </>    
  )
}
