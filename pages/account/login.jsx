import { makeStyles } from '@material-ui/core';

import AuthForm from '../../components/auth/AuthForm';

export const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={`full-height ${classes.page}`}>
      <AuthForm mode='login' />
    </div>
  );
};

export default Login;
