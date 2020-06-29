import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';

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
        loading={true}
        quantity={quantity}
        setQuantity={setQuantity}
        decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity}
      />
      <Details loading={true} />
    </main>
  );
};

export default Product;
