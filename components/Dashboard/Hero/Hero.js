import style from '../Dashboard.module.scss';
import { ThemeCntxt } from '../../../Context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { abbreviateNumber } from "js-abbreviation-number";


export default function Hero({setCardsModale,cards,expenses,setLoss,setGain,loss,gain,total}) {
    
    const {dark} = useContext(ThemeCntxt);


    useEffect(()=>{
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
          <h1 className={`${dark ? style.dark : style.light}`}>
            {abbreviateNumber(parseFloat(total).toFixed(2), 2)}
            <span>$</span>
          </h1>
          <div className={style.daily_incomes}>
            <div className={style.daily_incomes_elem}>
              <div>
                <img src="/images/arrow-up.svg" alt="" />
                <p className={`${dark ? style.dark : style.light}`}>$ {abbreviateNumber(parseFloat(gain).toFixed(2), 2)}</p>
              </div>
              <p>Income today</p>
            </div>
            <div className={style.daily_incomes_elem}>
              <div>
                <img src="/images/arrow-down.svg" alt="" />
                <p className={`${dark ? style.dark : style.light}`}>$ {abbreviateNumber(parseFloat(loss).toFixed(2), 2)}</p>
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
                  <h1>$ {abbreviateNumber(parseFloat(cards[0].balance).toFixed(2), 2)}</h1>
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
