import '../styles/globalsCSS.css'
import States from '../context/data';

function MyApp({ Component, pageProps }) {
  return (
    <States>
      <Component {...pageProps} />
    </States>
  )
}

export default MyApp;
