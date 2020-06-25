import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core';

import ItemCard from '../product/ItemCard';
import { homeGridStyles } from '../../lib/helpers';

const useStyles = makeStyles((theme) => ({
  ...homeGridStyles(theme),
  badge: {
    display: 'block',
  },
}));

const Latest = (props) => {
  const { loading, products } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container} fixed>
        <div className={classes.gridLabel}>
          <Typography component='h1' variant='h5'>
            Latest Additions
          </Typography>
          <ArrowForward />
        </div>
        <div className={classes.gridContainer}>
          <Grid className={classes.grid} spacing={6} container>
            {products.map((product, i) => (
              <Grid key={i} xs={12} sm={6} md={4} item>
                <Badge
                  className={classes.badge}
                  badgeContent='new'
                  color='primary'
                >
                  <ItemCard
                    loading={loading}
                    product={product}
                    id={`prod-${i}`}
                  />
                </Badge>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

Latest.defaultProps = {
  loading: false,
  products: [...Array(6)],
};

Latest.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  products: PropTypes.array,
};

export default Latest;
