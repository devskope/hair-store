import { makeStyles } from '@material-ui/core';

import AllProducts from '../components/landing/AllProducts';
import Banner from '../components/landing/Banner';
import Contact from '../components/landing/Contact';
import Latest from '../components/landing/Latest';
import TopCategories from '../components/landing/TopCategories';
import Trending from '../components/landing/Trending';

const useStyles = makeStyles((theme) => ({
  main: {
    '& > *': {
      borderRadius: theme.spacing(2),
      margin: '0 auto',
      marginBottom: '3rem',
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Banner id='banner' loading={true} />
      <AllProducts id='all-products' />
      <TopCategories id='top-categories' loading={true} />
      <Trending id='trending' loading={true} />
      <Latest id='latest' loading={true} />
      <Contact id='contact' />
    </main>
  );
};

export default Landing;
