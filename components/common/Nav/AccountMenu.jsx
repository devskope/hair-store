import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Link from '../Link';

const AccountMenu = (props) => {
  const { id, accountMenuAnchor, accountMenuOpen, closeAccountMenu } = props;
  return (
    <Menu
      id={id}
      anchorEl={accountMenuAnchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={accountMenuOpen}
      onClose={closeAccountMenu}
      keepMounted
    >
      <MenuItem onClick={closeAccountMenu}>Profile</MenuItem>
      <MenuItem
        component={Link}
        href='/account/login'
        onClick={closeAccountMenu}
        unsetColor
      >
        My account
      </MenuItem>
    </Menu>
  );
};

AccountMenu.proptypes = {
  id: PropTypes.string.isRequired,
  accountMenuAnchor: PropTypes.node.isRequired,
  accountMenuOpen: PropTypes.bool.isRequired,
  closeAccountMenu: PropTypes.func.isRequired,
};

export default AccountMenu;
