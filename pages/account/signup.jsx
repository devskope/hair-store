import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import AuthForm from '../../components/auth/AuthForm';

export const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Signup = () => {
  const classes = useStyles();

  const toc = (
    <Typography component='span' variant='subtitle2'>
      I agree to the{' '}
      <Typography
        component='span'
        variant='subtitle2'
        color='primary'
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Terms and Conditions.
      </Typography>
    </Typography>
  );

  return (
    <div className={`full-height ${classes.page}`}>
      <AuthForm mode='signup' toc={toc} />
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
