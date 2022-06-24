import style from '../Dashboard.module.scss';
import { ThemeCntxt } from '../../../Context/ThemeContext';
import { useContext } from 'react';
import Moment from 'react-moment';

export default function Hero({setCardsModale,cards}) {
    
    const {dark} = useContext(ThemeCntxt);
    
    return (
    <main className={`${style.hero} ${dark ? style.dark : style.light}`}>
        <div className={style.hero__left}>
          <h3>Total Balance</h3>
          <h1 className={`${dark ? style.dark : style.light}`}>32,549.00 <span>$</span></h1>
          <div className={style.daily_incomes}>
            <div className={style.daily_incomes_elem}>
              <div>
                <img src="/images/arrow-up.svg" alt="" />
                <p className={`${dark ? style.dark : style.light}`}>$ 302</p>
              </div>
              <p>Income today</p>
            </div>
            <div className={style.daily_incomes_elem}>
              <div>
                <img src="/images/arrow-down.svg" alt="" />
                <p className={`${dark ? style.dark : style.light}`}>$ 134</p>
              </div>
              <p><p>Expense today</p></p>
            </div>
          </div>
        </div>
        <div className={style.hero__right}>
            {
              cards[0] && 
              <div className={style.card} style={{background:cards[0].color}}>
                <section>
                  <h1>$ {parseFloat(cards[0].balance).toFixed(2)}</h1>
                  <img src="/images/icons/sim-card.svg" alt="" />
                </section>
                <div>
                  <p>{cards[0].name}</p>
                  <span>
                  <Moment format="DD MM">
                    {cards[0].createdAt}
                  </Moment>
                  </span>
                </div>
            </div>
            }
            
            <div 
              className={`${style.add_card} ${dark ? style.dark : style.light}`}
              onClick={()=>setCardsModale(true)}
            >
              <p>+ Add new card</p>
            </div>
        </div>
    </main>
  )
}
