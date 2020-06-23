import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core';

import Link from '../Link';

const useStyles = makeStyles((theme) => ({
  mobileToolbar: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  iconClass: {
    color: theme.palette.primary.contrastText,
  },
}));

const MobileSection = (props) => {
  const { mobileMenuOpen, mobileMenuId, openMobileMenu } = props;

  const { mobileToolbar, iconClass } = useStyles();

  return (
    <div className={mobileToolbar}>
      <Tooltip title='Cart' aria-label='Cart' arrow>
        <Link href='/cart'>
          <IconButton className={iconClass} aria-label='cart' color='inherit'>
            <ShoppingCart fontSize='large' />
          </IconButton>
        </Link>
      </Tooltip>
      <IconButton
        aria-label='show more'
        aria-controls={mobileMenuId}
        aria-haspopup='true'
        onClick={openMobileMenu}
        color='inherit'
      >
        {mobileMenuOpen ? (
          <MenuOpen fontSize='large' />
        ) : (
          <MenuIcon fontSize='large' />
        )}
      </IconButton>
    </div>
  );
};

MobileSection.propTypes = {
  mobileMenuOpen: PropTypes.bool.isRequired,
  mobileMenuId: PropTypes.string.isRequired,
  openMobileMenu: PropTypes.func.isRequired,
};

export default MobileSection;
