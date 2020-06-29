import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    '& input': {
      fontWeight: 500,
      textAlign: 'center',
      width: '6ch',
      '-moz-appearance': 'textfield',
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        margin: 0,
        '-webkit-appearance': 'none',
      },
      [theme.breakpoints.down(640)]: {
        width: '100%',
      },
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 30,
  },
}));

const QuantityPicker = (props) => {
  const { decrement, increment, value } = props;
  const classes = useStyles();

  const setValue = (e) => {
    const value = parseInt(e.target.value);
    props.setValue(value < 1 ? 0 : value);
  };
  return (
    <Paper variant='outlined' component='form' className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label='decrease quantity'
        onClick={decrement}
      >
        <Remove />
      </IconButton>
      <Divider className={classes.divider} orientation='vertical' />
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        placeholder='Qty'
        type='number'
        value={value || ''}
        onChange={setValue}
      />

      <Divider className={classes.divider} orientation='vertical' />
      <IconButton
        className={classes.iconButton}
        aria-label='increase quantity'
        onClick={increment}
      >
        <Add />
      </IconButton>
    </Paper>
  );
};

QuantityPicker.defaultProps = {
  value: 0,
};

QuantityPicker.proptypes = {
  value: PropTypes.number.isRequired,
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default QuantityPicker;
