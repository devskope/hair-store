import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

import Link from '../common/Link';
import transformApiError from '../../lib/utils/transformApiErrors';
import { VisibilityToggler } from '../common/Elements';
import { validateAuthForm } from '../../lib/utils/validators';
import { useEffect } from 'react';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 1rem',
  },
  form: {
    flexBasis: '85%',
    minWidth: '300px',
    maxWidth: '500px',
    height: 'max-content',
    padding: '1.5rem',
    '&:hover': {
      boxShadow: theme.shadows[2],
    },
  },
  fields: {
    marginTop: '1rem',
    border: 'none',
    '& > label.MuiFormControlLabel-root': {
      marginBottom: '1rem',
    },
    '& > :not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignSelf: 'center',
      height: '80px',
    },
  },
}));

const AuthForm = (props) => {
  const { mode, toc, onSubmit, loading, postError } = props;

  const classes = useStyles();

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [errorAlertVisible, setErrorAlert] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (postError) setErrorAlert(true);
  }, [postError]);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleInputChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: null });
  };

  const handleSubmit = (e) => {
    const { isValid, fieldErrors } = validateAuthForm(state, mode);
    e.preventDefault();

    if (!isValid) {
      setErrors(fieldErrors);
    } else {
      setErrorAlert(false);
      onSubmit(state);
    }
  };

  const ErrorAlert = (
    <Alert severity='error' icon={false} onClose={() => setErrorAlert(false)}>
      <ul>
        {postError?.message.includes('Failed to fetch') ? (
          <li> Network Error</li>
        ) : (
          transformApiError(postError)?.map((message, i) => (
            <li key={i}>{message}</li>
          ))
        )}
      </ul>
    </Alert>
  );

  return (
    <div className={`full-height ${classes.root}`}>
      <Paper
        className={classes.form}
        component='form'
        method='post'
        variant='outlined'
        onSubmit={handleSubmit}
      >
        <Typography align='center' component='h1' variant='h4'>
          {mode === 'login' ? 'Login' : 'Signup'}
        </Typography>
        <fieldset
          className={classes.fields}
          disabled={loading}
          aria-busy={loading}
        >
          <Collapse in={errorAlertVisible}>{ErrorAlert}</Collapse>
          {mode === 'signup' && (
            <TextField
              label='Username'
              variant='outlined'
              name='username'
              error={Boolean(errors.username)}
              helperText={errors.username}
              onChange={handleInputChange}
              fullWidth
            />
          )}
          <TextField
            label='Email'
            type='email'
            variant='outlined'
            name='email'
            error={Boolean(errors.email)}
            helperText={errors.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label='password'
            type={passwordVisible ? 'text' : 'password'}
            variant='outlined'
            name='password'
            error={Boolean(errors.password)}
            helperText={errors.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <VisibilityToggler
                  onClick={togglePasswordVisibility}
                  visible={passwordVisible}
                />
              ),
            }}
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox />}
            label={(mode === 'login' && 'Remember me') || toc}
          />
          <div className={classes.formActions}>
            <Button
              color='primary'
              size='large'
              variant='contained'
              type='submit'
              startIcon={
                loading ? (
                  <CircularProgress color='inherit' size='1rem' />
                ) : (
                  <AddIcon />
                )
              }
            >
              {`${mode === 'login' ? 'Login' : 'Create'}`}
            </Button>
            <Link href={`/account/${mode === 'login' ? 'signup' : 'login'}`}>
              <Typography>{`${
                mode === 'login' ? 'Create an Account' : 'Login to your Account'
              }`}</Typography>
            </Link>
          </div>
        </fieldset>
      </Paper>
    </div>
  );
};

AuthForm.propTypes = {
  mode: PropTypes.string.isRequired,
  toc: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  postError: PropTypes.object,
};

export default AuthForm;
