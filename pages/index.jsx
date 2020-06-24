import { makeStyles } from '@material-ui/core';

import Banner from '../components/landing/Banner';

const useStyles = makeStyles((theme) => ({
  main: {
    '& > *': {
      borderRadius: theme.spacing(2),
      margin: '0 auto',
      marginBottom: '3rem',
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <Banner id='banner' loading={true} />
    </main>
  );
};

export default Landing;
