import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core';

import ItemCard from '../product/ItemCard';
import { homeGridStyles } from '../../lib/helpers';

const useStyles = makeStyles((theme) => ({
  ...homeGridStyles(theme),
}));

const Trending = (props) => {
  const { id, loading, products } = props;
  const classes = useStyles();

  return (
    <div id={id} className={classes.root}>
      <Container className={classes.container} fixed>
        <div className={classes.gridLabel}>
          <Typography component='h1' variant='h5'>
            Top Trending
          </Typography>
          <ArrowForward />
        </div>
        <div className={classes.gridContainer}>
          <Grid className={classes.grid} spacing={6} container>
            {products.map((product, i) => (
              <Grid key={i} xs={12} sm={6} md={4} item>
                <ItemCard
                  loading={loading}
                  product={product}
                  id={`prod-${i}`}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

Trending.defaultProps = {
  loading: false,
  products: [...Array(6)],
};

Trending.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
};

export default Trending;
