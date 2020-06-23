import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ShoppingBasketSharp from '@material-ui/icons/ShoppingBasketSharp';
import { makeStyles, useTheme } from '@material-ui/core/';

import DesktopSection from './DesktopSection';
import MobileSection from './MobileSection';
import AccountMenu from './AccountMenu';
import InfoMenu from './InfoMenu';
import Search from './Search';
import NavDrawer from './NavDrawer';
import Link from '../Link';
import themes from '../../../lib/themes';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    borderBottomLeftRadius: '12%',
    borderBottomRightRadius: '12%',
  },
  toolBar: {
    height: '6rem',
    alignItems: 'center',
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const NavBar = (props) => {
  const { setTheme } = props;

  const classes = useStyles();
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [infoMenuAnchor, setInfoMenuAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const theme = useTheme();

  const infoMenuOpen = Boolean(infoMenuAnchor);
  const accountMenuOpen = Boolean(accountMenuAnchor);
  const mobileMenuOpen = Boolean(mobileMenuAnchor);

  const accountMenuId = 'account-menu';
  const mobileMenuId = 'mobile-menu';
  const infoMenuId = 'info-menu';

  const themeSwitcher =
    theme.palette.type === 'light' ? (
      <Brightness4Icon fontSize='large' />
    ) : (
      <Brightness7Icon fontSize='large' />
    );

  const toggleTheme = () => {
    if (theme.palette.type === 'light') {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  };

  const openInfoMenu = ({ currentTarget }) => {
    setInfoMenuAnchor(currentTarget);
  };

  const closeInfoMenu = () => {
    setInfoMenuAnchor(null);
  };

  const openAccountMenu = ({ currentTarget }) => {
    setAccountMenuAnchor(currentTarget);
  };

  const closeAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const openMobileMenu = ({ currentTarget }) => {
    setMobileMenuAnchor(currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Link href='/'>
            <IconButton className={classes.icon} aria-label='app logo'>
              <ShoppingBasketSharp fontSize='large' />
            </IconButton>
          </Link>

          <Link href='/' unsetColor>
            <Typography className={classes.title} variant='h6' noWrap>
              HairApp
            </Typography>
          </Link>

          <Search />

          <div className={classes.grow} />

          <DesktopSection
            accountMenuId={accountMenuId}
            infoMenuId={infoMenuId}
            openAccountMenu={openAccountMenu}
            openInfoMenu={openInfoMenu}
            themeSwitcher={themeSwitcher}
            toggleTheme={toggleTheme}
          />

          <MobileSection
            mobileMenuOpen={mobileMenuOpen}
            mobileMenuId={mobileMenuId}
            openMobileMenu={openMobileMenu}
          />
        </Toolbar>
      </AppBar>

      <AccountMenu
        id={accountMenuId}
        accountMenuAnchor={accountMenuAnchor}
        accountMenuOpen={accountMenuOpen}
        closeAccountMenu={closeAccountMenu}
      />

      <InfoMenu
        id={infoMenuId}
        closeInfoMenu={closeInfoMenu}
        infoMenuAnchor={infoMenuAnchor}
        infoMenuOpen={infoMenuOpen}
      />

      <NavDrawer
        id={mobileMenuId}
        isLightTheme={theme.palette.type === 'light'}
        toggleTheme={toggleTheme}
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </div>
  );
};

NavBar.proptypes = {
  setTheme: PropTypes.func,
};

export default NavBar;
