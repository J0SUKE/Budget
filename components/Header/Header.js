import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
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
                <Link href={'/dashboard'}><button>Dashboard</button></Link>
            </nav>
        </div>
    </header>
  )
}
