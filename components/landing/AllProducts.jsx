import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

import Link from '../common/Link';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  button: {
    padding: '1.2rem 3rem',
    fontSize: 'large',
  },
}));

const AllProducts = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link href='/products'>
        <Button className={classes.button} color='primary' variant='outlined'>
          All Products
        </Button>
      </Link>
    </div>
  );
};

AllProducts.propTypes = {
  id: PropTypes.string,
};

export default AllProducts;
