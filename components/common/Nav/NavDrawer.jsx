import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { makeStyles, styled, Tooltip } from '@material-ui/core';

import Link from '../Link';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    minWidth: '300px',
    width: '60%',
  },
  account: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '25%',
    justifyContent: 'space-between',
    padding: '0.5rem',
    borderBottom: `solid 3px ${theme.palette.divider}`,
  },
  accountDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: theme.spacing(9),
    width: theme.spacing(9),
  },
  accountActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    justifySelf: 'end',
    position: 'relative',
  },
  themeSwitcher: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

const NavDrawer = (props) => {
  const { id, open, onClose, isLightTheme, toggleTheme } = props;

  const classes = useStyles();

  const drawerClasses = { paper: classes.drawerPaper };
  return (
    <Drawer
      className={classes.drawer}
      classes={drawerClasses}
      id={id}
      open={open}
      onClose={onClose}
    >
      <div className={classes.account}>
        <div className={classes.accountDetails}>
          <Avatar className={classes.avatar} />
          <Typography variant='h5'>Appleseed</Typography>
        </div>
        <div className={classes.accountActions}>
          <Link href='/account/login' onClick={onClose} unsetColor>
            <Typography>Login</Typography>
          </Link>
          <div className={classes.themeSwitcher}>
            <Grid component='span' container alignItems='center' spacing={0}>
              <Tooltip title='Dark mode'>
                <Grid item>
                  <Brightness4Icon fontSize='inherit' />
                </Grid>
              </Tooltip>
              <Tooltip title='Toggle theme'>
                <Grid item>
                  <Switch
                    color='default'
                    size='small'
                    checked={isLightTheme}
                    onClick={toggleTheme}
                  />
                </Grid>
              </Tooltip>
              <Tooltip title='Light theme'>
                <Grid item>
                  <Brightness7Icon fontSize='inherit' />
                </Grid>
              </Tooltip>
            </Grid>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
NavDrawer.propTypes = {
  id: PropTypes.string.isRequired,
  isLightTheme: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default NavDrawer;
