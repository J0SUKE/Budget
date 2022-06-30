import Link from 'next/link';
import styles from './Header.module.scss';
import { useContext } from 'react';
import {userContext} from '../../Context/UserContext'

export default function Header() {
  
  const {user} = useContext(userContext);

  return (
    <header className={styles.header_container}>
        <div className={styles.header}>
            <Link href={'/'}>
                <div className={styles.logo}>
                  <p>B</p>
                </div>
            </Link>
            <nav>
                <Link href={'/login'}><a><button>Log in</button></a></Link>
                <Link href={'/signup'}><a><button>Sign Up</button></a></Link>
                {
                  user && <Link href={'/dashboard'}>
                    <a>
                      <div className={styles.user_btn}>{user.email[0]}</div>
                    </a>
                  </Link>
                }
            </nav>
        </div>
    </header>
  )
}
