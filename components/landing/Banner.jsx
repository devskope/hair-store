import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import Container from '@material-ui/core/Container';
import { fade, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  carousel: {
    flex: '0 0 100%',
    maxWidth: '700px',
    borderRadius: '10px',
  },
  slideItem: {
    '& img': {
      maxHeight: '100%',
      minHeight: '100%',
      maxWidth: '100%',
    },
  },
  description: {
    borderRadius: theme.spacing(2, 2, 0, 0),
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '1rem',
    background: fade(theme.palette.common.black, 0.4),
    color: fade(theme.palette.common.white, 0.9),
  },
}));

const Banner = (props) => {
  const { id, loading, products } = props;

  const classes = useStyles();
  const theme = useTheme();

  if (loading || !products[0])
    return (
      <div id={id}>
        <Container className={classes.container}>
          <ContentLoader
            className={classes.carousel}
            backgroundColor={theme.palette.primary.dark}
            foregroundColor={theme.palette.primary.main}
            viewBox='0 0 700 394'
            uniqueKey={id}
            speed={4}
          >
            <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
          </ContentLoader>
        </Container>
      </div>
    );
};

Banner.defaultProps = {
  products: [...Array(6)],
};

Banner.propTypes = {
  loading: PropTypes.bool.isRequired,
  id: PropTypes.string,
  products: PropTypes.array.isRequired,
};

export default Banner;
