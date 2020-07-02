import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  panel: {
    height: '2.5rem',
    alignItems: 'center',
  },
  panelHeader: {
    textTransform: 'capitalize',
  },
  productPane: {
    maxHeight: '450px',
    minHeight: '350px',
    paddingBottom: '1rem',
    overflowX: 'hidden',
    overflowY: 'scroll',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const CategoryPanel = (props) => {
  const { id, name, onChange, expanded } = props;

  const classes = useStyles();

  const generateContentContainerId = (name) => `${name.replace(' ', '-')}-grid`;

  const panelSummaryProps = (name) => ({
    'aria-controls': generateContentContainerId(name),
    className: 'panel-summary',
    id,
  });

  return (
    <ExpansionPanel
      expanded={expanded === name}
      onChange={onChange(name)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary
        classes={{
          content: classes.panel,
        }}
        expandIcon={<ExpandMore />}
        {...panelSummaryProps(name)}
      >
        <Typography className={classes.panelHeader} variant='h6' component='h1'>
          {name}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        id={generateContentContainerId(name)}
        className={classes.productPane}
      ></ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

CategoryPanel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  expanded: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryPanel;
