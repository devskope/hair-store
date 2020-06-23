import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core';

import Link from '../Link';

const useStyles = makeStyles((theme) => ({
  desktopToolbar: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  iconClass: {
    color: theme.palette.primary.contrastText,
  },
}));

const DesktopSection = (props) => {
  const {
    accountMenuId,
    infoMenuId,
    openAccountMenu,
    openInfoMenu,
    themeSwitcher,
    toggleTheme,
  } = props;

  const { desktopToolbar, iconClass } = useStyles();

  return (
    <div className={desktopToolbar}>
      <Tooltip title='Change theme' aria-label='Site information' arrow>
        <IconButton
          aria-label='change theme'
          color='inherit'
          onClick={toggleTheme}
          children={themeSwitcher}
        />
      </Tooltip>
      <Tooltip title='Site info' aria-label='Site information' arrow>
        <IconButton
          aria-label='Site information'
          aria-controls={infoMenuId}
          aria-haspopup='true'
          color='inherit'
          onClick={openInfoMenu}
          children={<InfoIcon fontSize='large' />}
        />
      </Tooltip>

      <Tooltip title='Account' aria-label='Account' arrow>
        <IconButton
          aria-label='user Account widget'
          aria-controls={accountMenuId}
          aria-haspopup='true'
          color='inherit'
          onClick={openAccountMenu}
          children={<AccountCircle fontSize='large' />}
        />
      </Tooltip>
      <Tooltip title='Cart' aria-label='Cart' arrow>
        <Link href='/cart'>
          <IconButton className={iconClass} aria-label='cart' color='inherit'>
            <ShoppingCart fontSize='large' />
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  );
};

DesktopSection.propTypes = {
  accountMenuId: PropTypes.string.isRequired,
  infoMenuId: PropTypes.string.isRequired,
  openAccountMenu: PropTypes.func.isRequired,
  openInfoMenu: PropTypes.func.isRequired,
  themeSwitcher: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default DesktopSection;
