import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    '&:hover': {
      boxShadow: theme.shadows[2],
    },
    [theme.breakpoints.down('sm')]: {
      width: '15rem',
    },
  },
}));

const ItemCard = (props) => {
  const { loading, product, id } = props;

  const classes = useStyles();
  const theme = useTheme();

  if (loading || !product) {
    return (
      <Card className={classes.card} variant='outlined'>
        <ContentLoader
          speed={3}
          width='100%'
          height={295}
          viewBox='0 0 270 295'
          backgroundColor={theme.palette.primary.dark}
          foregroundColor={theme.palette.primary.main}
          uniqueKey={id}
        >
          <rect x='0' y='0' rx='0' ry='0' width='285' height='150' />
          <rect x='10' y='163' rx='0' ry='0' width='218' height='7' />
          <rect x='10' y='175' rx='0' ry='0' width='218' height='8' />
          <rect x='10' y='201' rx='0' ry='0' width='218' height='6' />
          <rect x='10' y='259' rx='0' ry='0' width='63' height='26' />
        </ContentLoader>
      </Card>
    );
  }
};

ItemCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  id: PropTypes.string,
};

export default ItemCard;
