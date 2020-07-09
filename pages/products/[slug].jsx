import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';

import { GET_PRODUCT } from '../../lib/graphql/queries/products';

import Header from '../../components/product/Header';
import Details from '../../components/product/Details';

const useStyles = makeStyles((theme) => ({
  page: {
    padding: '1rem',
    '& > *': {
      marginBottom: '4rem',
    },
  },
}));

const Product = (props) => {
  const {
    query: { slug },
  } = useRouter();

  const { data, loading } = useQuery(GET_PRODUCT, {
    skip: !slug,
    variables: { slug },
  });

  const [quantity, setQuantity] = useState(0);

  const classes = useStyles();

  const decrementQuantity = () => {
    setQuantity((qty) => (qty < 1 ? 0 : qty - 1));
  };

  const incrementQuantity = () => {
    setQuantity((qty) => qty + 1);
  };

  return (
    <main className={`full-height ${classes.page}`}>
      <Header
        loading={loading}
        product={data?.product}
        quantity={quantity}
        setQuantity={setQuantity}
        decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity}
      />
      <Details loading={loading} product={data?.product} />
    </main>
  );
};

export default Product;
