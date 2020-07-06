import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import ItemCard from './ItemCard';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_BY_CATEGORY } from '../../lib/graphql/queries/products';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 8,
  },
}));

const CategoryProducts = (props) => {
  const { category } = props;

  const classes = useStyles();

  const { data, loading } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { name: category, start: 0 },
  });

  const products = data?.products;

  if (loading || !data) {
    return (
      <Grid className={classes.container} spacing={6} container>
        {[...Array(3)].map((_, i) => (
          <Grid key={i} xs={12} sm={6} md={4} item>
            <ItemCard loading={loading} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid className={classes.container} spacing={6} container>
      {products.map((product, i) => (
        <Grid key={i} xs={12} sm={6} md={4} item>
          <ItemCard loading={loading} product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

CategoryProducts.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryProducts;
