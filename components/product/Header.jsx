import Carousel from 'react-multi-carousel';
import ContentLoader from 'react-content-loader';
import Image from 'material-ui-image';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles, useTheme } from '@material-ui/core';

import QuantityPicker from './QuantityPicker';
import TagCloud from './TagCloud';

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
      minHeight: (props) => (props.tagCount >= 1 ? '23rem' : '18rem'),
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
  const { loading, product, quantity } = props;

  const tags = (!loading && product?.tags) ?? [];

  const classes = useStyles({ tagCount: tags.length + 1 });
  const theme = useTheme();

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
};

Header.proptypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default Header;
