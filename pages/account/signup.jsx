import { Typography, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import AuthForm from '../../components/auth/AuthForm';
import { CREATE_USER } from '../../lib/graphql/mutations/users';

export const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const router = useRouter();

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSignup = async (formData) => {
    try {
      await createUser({ variables: formData });
      router.push('/');
    } catch (error) {}
  };

  const toc = (
    <Typography component='span' variant='subtitle2'>
      I agree to the{' '}
      <Typography component='span' variant='subtitle2' color='primary'>
        Terms and Conditions.
      </Typography>
    </Typography>
  );

  return (
    <div className={`full-height ${classes.page}`}>
      <AuthForm
        mode='signup'
        toc={toc}
        loading={loading}
        onSubmit={handleSignup}
        postError={error}
      />
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
