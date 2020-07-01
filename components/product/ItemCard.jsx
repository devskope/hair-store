import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import Image from 'material-ui-image';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { fade, makeStyles, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Link from '../common/Link';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: 'none',
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    '& .like': {
      position: 'absolute',
      zIndex: 5,
    },
    '&:hover': {
      boxShadow: theme.shadows[2],
    },
    [theme.breakpoints.down('sm')]: {
      width: '15rem',
    },
  },
  cardContent: {
    flexGrow: 1,
    borderBottom: `1px solid ${fade(theme.palette.secondary.main, 0.2)}`,
  },
  likeIcon: {
    fill: theme.palette.primary.main,
  },
}));

const ItemCard = (props) => {
  const { loading, product, id } = props;

  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [cardLike, setCardState] = useState(false);

  const likeIcon = cardLike ? (
    <Favorite color='error' />
  ) : (
    <FavoriteBorder className={classes.likeIcon} />
  );
  const toggleLike = (e) => {
    e.stopPropagation();
    setCardState(!cardLike);
  };

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

  return (
    <Card
      className={classes.card}
      onClick={() => router.push(`/products/${product.slug}`)}
      variant='outlined'
    >
      <IconButton className='like' children={likeIcon} onClick={toggleLike} />
      <Link href='/products/[slug]' as={`/products/${product.slug}`}>
        <Image
          alt='item image'
          src={product.images[0]?.formats.small.url}
          style={{ backgroundColor: 'none', paddingTop: '56.25%' }}
          loading={<CircularProgress size='1rem' />}
        />
      </Link>
      <CardContent
        className={classes.cardContent}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography gutterBottom variant='h5' component='h2'>
          {product.name}
        </Typography>
        <Typography>{product.summary}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' color='primary'>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  id: PropTypes.string,
};

export default ItemCard;
