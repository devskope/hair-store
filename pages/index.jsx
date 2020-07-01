import { makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import AllProducts from '../components/landing/AllProducts';
import Banner from '../components/landing/Banner';
import Contact from '../components/landing/Contact';
import Latest from '../components/landing/Latest';
import TopCategories from '../components/landing/TopCategories';
import Trending from '../components/landing/Trending';
import { GET_HOMEPAGE_PRODUCTS } from '../lib/graphql/queries/products';

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
  const { data, loading } = useQuery(GET_HOMEPAGE_PRODUCTS);
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Banner id='banner' loading={loading} products={data?.featuredProducts} />
      <AllProducts id='all-products' />
      <TopCategories
        id='top-categories'
        loading={loading}
        categories={data?.categories}
      />
      <Trending id='trending' loading={true} />
      <Latest id='latest' loading={true} />
      <Contact id='contact' />
    </main>
  );
};

export default Landing;
