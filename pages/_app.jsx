import useMuiTheme from '@devskope/use-mui-theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { makeStyles } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';

import NavBar from '../components/common/Nav/Navbar';
import Footer from '../components/common/Footer';
import pageLoader from '../lib/pageLoader';
import withApollo from '../lib/graphql/apolloConfig';
import themes from '../lib/themes';
import { AuthProvider } from '../lib/context/auth';

pageLoader();

const useStyles = makeStyles((theme) => ({
  main: {
    width: '95%',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '7rem',
  },
}));

const App = (props) => {
  const { Component, pageProps, apollo } = props;

  const classes = useStyles();

  const [theme, setTheme] = useMuiTheme(themes.light);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider refresh={Component}>
            <NavBar setTheme={setTheme} />
            <div className={classes.main}>
              <Component {...pageProps} />
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default withApollo(App);
