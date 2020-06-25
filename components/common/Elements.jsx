import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const VisibilityToggler = ({ visible, onClick }) => {
  return (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle visibility'
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}
        edge='end'
      >
        {visible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};
