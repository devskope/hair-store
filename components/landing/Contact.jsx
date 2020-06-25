import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

import { validateContactForm } from '../../lib/utils/validators';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 3, 2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down(800)]: {
      flexDirection: 'column-reverse',
      marginTop: '5rem',
    },
  },
  form: {
    padding: theme.spacing(5, 3, 4),
    maxWidth: '500px',
    '& > :not(:last-child)': {
      marginBottom: '2rem',
    },
    '&:hover': {
      boxShadow: theme.shadows[2],
    },
  },
  group: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      flexBasis: '45%',
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        margin: 0,
        '-webkit-appearance': 'none',
      },
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      '& > :not(:last-child)': {
        marginBottom: '2rem',
      },
    },
  },
  linkList: {
    height: 'min-content',
    marginTop: '-4rem',
  },
}));

const Contact = ({ id }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, fieldErrors } = validateContactForm(state);
    if (!isValid) {
      setErrors(fieldErrors);
    }
  };

  return (
    <div className={classes.root} id={id}>
      <Typography className={classes.header} component='h1' variant='h5'>
        Contact Us
      </Typography>
      <Container className={classes.container}>
        <Paper
          className={classes.form}
          component='form'
          method='post'
          elevation={0}
          onSubmit={handleSubmit}
        >
          <TextField
            label='Name'
            name='name'
            variant='outlined'
            value={state.name}
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={handleInputChange}
            fullWidth
          />
          <div className={classes.group}>
            <TextField
              label='Email'
              name='email'
              type='email'
              variant='outlined'
              value={state.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              label='Phone Number'
              name='phone'
              type='number'
              variant='outlined'
              value={state.phone}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <TextField
            label='Leave a message...'
            name='message'
            variant='outlined'
            value={state.message}
            error={Boolean(errors.message)}
            helperText={errors.message}
            onChange={handleInputChange}
            rows={8}
            fullWidth
            multiline
          />
          <Button
            color='primary'
            size='large'
            type='submit'
            variant='contained'
            startIcon={<SendIcon />}
          >
            Send
          </Button>
        </Paper>
        <div className={classes.linkList}>
          <IconButton
            aria-label='facebook icon'
            color='inherit'
            children={<FacebookIcon fontSize='large' />}
          />
          <IconButton
            aria-label='instagram icon'
            color='inherit'
            children={<InstagramIcon fontSize='large' />}
          />
          <IconButton
            aria-label='whatsapp icon'
            color='inherit'
            children={<WhatsappIcon fontSize='large' />}
          />
        </div>
      </Container>
    </div>
  );
};

Contact.propTypes = {
  id: PropTypes.string,
};

export default Contact;
