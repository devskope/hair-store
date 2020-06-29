import ContentLoader from 'react-content-loader';
import { Container, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    paddingBottom: '2rem',
  },
  search: {
    marginBottom: '3rem',
    maxWidth: '500px',
    width: '70%',
    '& label': {
      fontSize: '1.5rem',
    },
    '& input': {
      fontSize: '2rem',
      fontStyle: 'italic',
      fontWeight: 400,
    },
  },
}));

const Products = () => {
  const classes = useStyles();
  const theme = useTheme();

  if (true) {
    return (
      <main className={`full-height ${classes.page}`}>
        <Container className={classes.container} fixed>
          <ContentLoader
            speed={2}
            width='100%'
            viewBox='0 0 1000 500'
            backgroundColor={theme.palette.primary.dark}
            foregroundColor={theme.palette.primary.main}
            uniqueKey={'x'}
          >
            <rect x='0' y='4rem' rx='10' ry='10' width='50%' height='3.5rem' />

            <rect x='0' y='11rem' rx='0' ry='0' width='100%' height='3rem' />
            <rect x='0' y='14.5rem' rx='0' ry='0' width='100%' height='3rem' />
            <rect x='0' y='18rem' rx='0' ry='0' width='100%' height='3rem' />
            <rect x='0' y='21.5rem' rx='0' ry='0' width='100%' height='3rem' />
          </ContentLoader>
        </Container>
      </main>
    );
  }
};

export default Products;
