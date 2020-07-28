import { makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import AuthForm from '../../components/auth/AuthForm';
import { NoAuth } from '../../components/auth/AuthHOCs';
import { LOGIN } from '../../lib/graphql/mutations/users';

export const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleLogin = async (formData) => {
    try {
      await login({ variables: formData });
      router.push('/');
    } catch (error) {}
  };

  return (
    <div className={`full-height ${classes.page}`}>
      <AuthForm
        mode='login'
        onSubmit={handleLogin}
        loading={loading}
        postError={error}
      />
    </div>
  );
};

export default NoAuth(Login);
