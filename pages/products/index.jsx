import ContentLoader from 'react-content-loader';
import { Container, makeStyles, TextField, useTheme } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CategoryPanel from '../../components/product/CategoryPanel';
import { GET_CATEGORIES } from '../../lib/graphql/queries/categories';
import { scrollToTarget } from '../../lib/helpers';

const useStyles = makeStyles((theme) => ({
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
  const { data, loading } = useQuery(GET_CATEGORIES);
  const [expanded, setExpanded] = useState('none');
  const classes = useStyles();
  const theme = useTheme();

  const categories = data?.categories ?? [];

  const generatePanelId = (name) => {
    return `${name.replace(' ', '-')}-panel-header`.toLowerCase();
  };
  const focusPanel = (id) => {
    setTimeout(() => {
      scrollToTarget(`#${id}`, { behavior: 'smooth' });
    }, 350);
  };
  const handlePanelEpansionState = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : 'none');

    if (isExpanded) focusPanel(generatePanelId(panel));

    window.history.replaceState(
      {},
      '',
      `${location.pathname}?category=${panel}`
    );
  };

  if (loading || !data) {
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

  return (
    <main className={`full-height ${classes.page}`}>
      <Container className={classes.container} fixed>
        <TextField className={classes.search} label='Search Products' />
        {categories.map(({ name }) => (
          <CategoryPanel
            key={name}
            id={generatePanelId(name)}
            name={name}
            expanded={expanded}
            onChange={handlePanelEpansionState}
          />
        ))}
      </Container>
    </main>
  );
};

export default Products;
