import style from '../Dashboard.module.scss';
import { ThemeCntxt } from '../../../Context/ThemeContext';
import { useContext } from 'react';
import Moment from 'react-moment';
import { abbreviateNumber } from "js-abbreviation-number";

export default function Cards({cards,setModifyCardModale}) {
  
    const {dark} = useContext(ThemeCntxt);

    return (
    <div className={`${style.cards_zone}`}>
        <h2 className={`${dark ? style.dark : style.light}`}><strong>Cards</strong> Registered</h2>
        <div className={`${style.cards} ${dark ? style.dark : style.light}`}>
            {
                cards.length == 0 ?
                <p className={`${dark ? style.dark : style.light}`}>No cards</p>
                :
                <ul>
                    {
                        cards.map(item=>{
                            return(
                                <li 
                                    key={item.name} 
                                    className={`${dark ? style.dark : style.light}`}
                                    onClick={()=>setModifyCardModale(item)}
                                >
                                    <div className={style.icon} style={{background:item.color}}>
                                        <img src="/images/icons/sim-card.svg" alt="" />
                                    </div>
                                    <div className={style.infos}>
                                        <h3 className={`${dark ? style.dark : style.light}`}>{item.name}</h3>
                                        <p>Last use : <Moment format="DD MMM">
                                            {item.lastUse}
                                        </Moment></p>                                        
                                    </div>
                                    <div className={`${style.balance} ${dark ? style.dark : style.light}`}>
                                        $ {parseFloat(item.balance).toFixed(2)}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    </div>
  )
}
