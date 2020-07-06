import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import ItemCard from './ItemCard';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_BY_CATEGORY } from '../../lib/graphql/queries/products';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 8,
  },
}));

const CategoryProducts = (props) => {
  const { category, endRef, loadMore, setLoadMore, togglePanelInfo } = props;

  const classes = useStyles();

  const { data, loading, fetchMore } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { name: category, start: 0, limit: 6 },
  });

  const products = data?.products;
  const productCount = (products && products.length) ?? 0;

  useEffect(() => {
    if (loadMore) {
      fetchMore({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { name: category, start: productCount, limit: 6 },
        updateQuery: (previousRes, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            togglePanelInfo('End');
            return previousRes;
          }

          setLoadMore(false);

          if (fetchMoreResult.products.length === 0) {
            togglePanelInfo('End');
          }

          return {
            ...previousRes,
            ...{
              products: [...previousRes.products, ...fetchMoreResult.products],
            },
          };
        },
      });
    }
  }, [loadMore]);

  if (loading && !data) {
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
          <ItemCard
            loading={loading}
            product={product}
            {...(i === productCount - 1 && { endRef: endRef })}
          />
        </Grid>
      ))}
    </Grid>
  );
};

CategoryProducts.propTypes = {
  category: PropTypes.string.isRequired,
  loadMore: PropTypes.bool,
  endRef: PropTypes.func,
  setLoadMore: PropTypes.func,
  togglePanelInfo: PropTypes.func,
};

export default CategoryProducts;
