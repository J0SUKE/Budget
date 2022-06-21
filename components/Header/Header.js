import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header>
        <div className={styles.header}>
            <Link href={'/'}>
                Budget
            </Link>
            <nav>
                <Link href={'/login'}><button>Log in</button></Link>
                <Link href={'/signup'}><button>Sign Up</button></Link>
            </nav>
        </div>
    </header>
  )
}
