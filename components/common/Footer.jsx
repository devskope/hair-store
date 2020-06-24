import { makeStyles, Typography } from '@material-ui/core';

import Link from './Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '15%',
    borderTopRightRadius: '15%',
    display: 'grid',
    alignContent: 'center',
    padding: theme.spacing(1.5),
    minHeight: '3rem',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Link href='/' unsetColor>
          <Typography align='center' variant='body2'>
            © Hair App {new Date().getFullYear()}.
          </Typography>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
