import useMuiTheme from '@devskope/use-mui-theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import 'react-multi-carousel/lib/styles.css';

import NavBar from '../components/common/Nav/Navbar';
import Footer from '../components/common/Footer';
import pageLoader from '../lib/pageLoader';
import withApollo from '../lib/graphql/apolloConfig';
import themes from '../lib/themes';

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
          <NavBar setTheme={setTheme} />
          <div className={classes.main}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default withApollo(App);
