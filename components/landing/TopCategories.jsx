import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';

import { sectionSpacing } from '../../lib/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    overflowX: 'auto',
  },
  container: {
    ...sectionSpacing(theme),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  grid: {
    justifyContent: 'space-between',
    padding: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  categoryBtn: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 1rem',
    },
  },
  category: {
    background: theme.palette.background.paper,
    borderColor: 'transparent',
    minWidth: '10rem',
    padding: theme.spacing(2, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      borderColor: 'rgba(204, 204, 204, 0.4)',
    },
    '& .image': {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    '& .label': {
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(1),
      fontSize: '1.2rem',
    },
    [theme.breakpoints.down('sm')]: {
      borderColor: 'rgba(204, 204, 204, 0.4)',
    },
  },
}));

const TopCategories = (props) => {
  const { id, loading, categories, getOffsetTop, pageHeight } = props;

  const classes = useStyles();
  const theme = useTheme();

  if (loading || !categories.length) {
    return (
      <div className={classes.root} id={id}>
        <Container className={classes.container}>
          <Grid className={classes.grid} spacing={6} container>
            {[...Array(5)].map((_, i) => (
              <ContentLoader
                className={classes.category}
                key={i}
                speed={4}
                width={160}
                height={135}
                viewBox='0 0 160 135'
                backgroundColor={theme.palette.primary.dark}
                foregroundColor={theme.palette.primary.main}
                uniqueKey={`category-${i}`}
              >
                <circle cx='86' cy='44' r='2.3rem' />
                <rect x='45' y='97' rx='5' ry='5' width='82' height='12' />
              </ContentLoader>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
};

TopCategories.defaultProps = {
  categories: [],
  getOffsetTop: (x) => x,
};

TopCategories.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired
  ),
  getOffsetTop: PropTypes.func,
  pageHeight: PropTypes.number,
};

export default TopCategories;
