import UserContext from '../Context/UserContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return <UserContext>
    <Component {...pageProps} />
  </UserContext>
}

export default MyApp
