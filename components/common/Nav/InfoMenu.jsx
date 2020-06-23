import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Link from '../Link';

const InfoMenu = (props) => {
  const { id, closeInfoMenu, infoMenuAnchor, infoMenuOpen } = props;

  return (
    <Menu
      id={id}
      anchorEl={infoMenuAnchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={infoMenuOpen}
      onClick={closeInfoMenu}
      onClose={closeInfoMenu}
      keepMounted
    >
      <MenuItem component={Link} href='/about' unsetColor>
        About us
      </MenuItem>
      <MenuItem component={Link} href='/#contact' unsetColor>
        Contact us
      </MenuItem>
    </Menu>
  );
};

InfoMenu.propTypes = {
  id: PropTypes.string.isRequired,
  closeInfoMenu: PropTypes.func.isRequired,
  infoMenuAnchor: PropTypes.object,
  infoMenuOpen: PropTypes.bool.isRequired,
};

export default InfoMenu;
