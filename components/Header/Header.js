import Link from 'next/link';
import styles from './Header.module.scss';
import { useContext } from 'react';
import {userContext} from '../../Context/UserContext'

export default function Header() {
  
  const {user} = useContext(userContext);

  return (
    <header>
        <div className={styles.header}>
            <Link href={'/'}>
                <div className={styles.logo}>
                  <p>B</p>
                </div>
            </Link>
            <nav>
                <Link href={'/login'}><button>Log in</button></Link>
                <Link href={'/signup'}><button>Sign Up</button></Link>
                {
                  user && <Link href={'/dashboard'}><div className={styles.user_btn}>{user.email[0]}</div></Link>
                }
            </nav>
        </div>
    </header>
  )
}
