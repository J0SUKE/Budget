import styles from './Bubbles.module.scss';
import { useRef,useEffect } from 'react';

export default function Bubbles() {
    
    const applePrice = useRef();
    const netflixPrice = useRef();
    const starbucksPrice = useRef();

    function animatePrice(node) {

            node.className = styles.start;
            setTimeout(()=>{
                node.className = styles.middle;
            },6000);
            setTimeout(()=>{
                node.className = styles.end;
            },12000);
        
            setInterval(() => {
                node.className = styles.start;
                setTimeout(()=>{
                    node.className = styles.middle;
                },6000);
                setTimeout(()=>{
                    node.className = styles.end;
                },12000);
            }, 17000);
        
    }

    useEffect(()=>{
        animatePrice(applePrice.current);
        animatePrice(netflixPrice.current);
        animatePrice(starbucksPrice.current);
    },[])
  
    return (
    <div className={`${styles.details__content__illustration} ${styles.bubbles}`}>
        <div className={styles.bubble} id={styles.bubble1}></div>
        <section className={styles.bubble__content}>
        <img src="/images/apple.svg" alt="" />
        <p ref={applePrice}></p>
        </section>  
        <div className={styles.bubble} id={styles.bubble2}></div>
        <section className={styles.bubble__content}>
        <img src="/images/netflix.svg" alt="" />
        <p ref={netflixPrice}></p>
        </section>
        <div className={styles.bubble} id={styles.bubble3}></div>
        <section className={styles.bubble__content}>
        <img src="/images/starbucks.svg" alt="" />
        <p ref={starbucksPrice}></p>
        </section>
    </div>
  )
}
