import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '0.5rem',
    borderRadius: theme.spacing(0, 0, 1, 1),
  },
  panel: {
    padding: '0.5rem',
    minHeight: '30ch',
    fontSize: 'large',
  },
}));

const TabPanel = (props) => {
  const { children, value, id, index, ...other } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.panel}
        hidden={value !== index}
        role='tabpanel'
        id={id}
        {...other}
      >
        {value === index && children}
      </div>
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
