import style from '../Dashboard.module.scss';
import { ThemeCntxt } from '../../../Context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

export default function Hero({setCardsModale,cards,expenses,setLoss,setGain,loss,gain}) {
    
    const {dark} = useContext(ThemeCntxt);
    const [total,setTotal] = useState(0);


    useEffect(()=>{
      let tot = 0;
      cards.forEach(element => {
        tot+=parseFloat(element.balance);
      });
      setTotal(tot);

      // calcul des differentiels 

      let loss = 0;
      let gain=0;
      let yesterday = new Date();
      yesterday=yesterday.setHours(yesterday.getHours()-24);
      
      expenses.forEach(exp=>{
          if (new Date(exp.time).getTime() >= yesterday) 
          {
            if (parseFloat(exp.sum)>0) {
              gain+=parseFloat(exp.sum);
            } 
            else{
              loss+=Math.abs(parseFloat(exp.sum));
            }
          }          
      })

      setLoss(loss);
      setGain(gain);

    },[cards]);

    
    return (
    <main className={`${style.hero} ${dark ? style.dark : style.light}`}>
        <div className={style.hero__left}>
          <h3>Total Balance</h3>
          <h1 className={`${dark ? style.dark : style.light}`}>{total.toFixed(2)} <span>$</span></h1>
          <div className={style.daily_incomes}>
            <div className={style.daily_incomes_elem}>
              <div>
                <img src="/images/arrow-up.svg" alt="" />
                <p className={`${dark ? style.dark : style.light}`}>$ {gain.toFixed(2)}</p>
              </div>
              <p>Income today</p>
            </div>
            <div className={style.daily_incomes_elem}>
              <div>
                <img src="/images/arrow-down.svg" alt="" />
                <p className={`${dark ? style.dark : style.light}`}>$ {(loss).toFixed(2)}</p>
              </div>
              <p>Expense today</p>
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
