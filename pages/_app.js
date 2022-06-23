import UserContext from '../Context/UserContext';
import ThemeContext from '../Context/ThemeContext';
import '../styles/globals.scss';


function MyApp({ Component, pageProps }) {
  return <ThemeContext>
          <UserContext>
            <Component {...pageProps} />
          </UserContext>
        </ThemeContext>  
}

export default MyApp
