import Carousel from 'react-multi-carousel';
import ContentLoader from 'react-content-loader';
import Image from 'material-ui-image';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core';

import QuantityPicker from './QuantityPicker';
import TagCloud from './TagCloud';
import { bannerItemsConfig } from '../../lib/config';

const useStyles = makeStyles((theme) => ({
  slider: {
    [theme.breakpoints.up('md')]: {
      minHeight: '330px',
    },
  },
  headerInfoCell: {
    display: 'flex',
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '2rem auto',
      flexBasis: '90%',
    },
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minHeight: '95%',
    padding: '0 2rem',
    minWidth: '90%',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      minHeight: (props) => (props.tagCount ? '23rem' : '18rem'),
      textAlign: 'center',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '0.5rem',
    [theme.breakpoints.down(640)]: {
      flexDirection: 'column',
      '& > :not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));

const Header = (props) => {
  const {
    loading,
    product,
    quantity,
    setQuantity,
    decrementQuantity,
    incrementQuantity,
  } = props;

  const tags = (!loading && product?.tags) ?? [];

  const classes = useStyles({ tagCount: tags.length });
  const theme = useTheme();

  const imgStyle = { backgroundColor: 'none', paddingTop: '56.25%' };
  const computePrice = quantity ? product?.price * quantity : product?.price;

  if (loading || !product) {
    return (
      <div className='section'>
        <Paper variant='outlined'>
          <Grid container>
            <Grid xs={12} sm={12} md={6} item>
              <ContentLoader
                speed={4}
                width='100%'
                height='100%'
                viewBox='0 0 700 394'
                backgroundColor={theme.palette.primary.dark}
                foregroundColor={theme.palette.primary.main}
                uniqueKey='key'
              >
                <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
              </ContentLoader>
            </Grid>

            <Grid className={classes.headerInfoCell} item>
              <Paper className={classes.headerInfo} variant='outlined'>
                <TagCloud loading={loading} />
                <div className={classes.actions}>
                  <QuantityPicker value={0} />
                  <Button color='primary' variant='contained' disabled>
                    Add to cart
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }

  return (
    <div className='section'>
      <Paper variant='outlined'>
        <Grid container>
          <Grid xs={12} sm={12} md={6} item>
            {product?.images && (
              <Carousel
                className={classes.slider}
                responsive={bannerItemsConfig}
              >
                {product.images.map((img, i) => (
                  <Image key={i} src={img.url} style={imgStyle} alt={img.alt} />
                ))}
              </Carousel>
            )}
          </Grid>

          <Grid className={classes.headerInfoCell} item>
            <Paper className={classes.headerInfo} variant='outlined'>
              <Typography variant='h4' component='h1'>
                {product.name}
              </Typography>

              <TagCloud loading={loading} tags={tags} />

              <Typography variant='h5' component='h2'>
                {product.currency} {computePrice}
              </Typography>

              <div className={classes.actions}>
                <QuantityPicker
                  decrement={decrementQuantity}
                  increment={incrementQuantity}
                  setValue={setQuantity}
                  value={quantity}
                />
                <Button color='primary' variant='contained'>
                  Add to cart
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

Header.defaultProps = {};

Header.proptypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
};

export default Header;
