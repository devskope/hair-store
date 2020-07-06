import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress, makeStyles } from '@material-ui/core';

import CategoryProducts from './CategoryProducts';
import useIntersectionObserver from '../../lib/hooks/useIntersectionObserver';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  panel: {
    height: '2.5rem',
    alignItems: 'center',
  },
  panelHeader: {
    textTransform: 'capitalize',
  },
  panelInfo: {
    marginLeft: 'auto',
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
  loader: {
    visibility: (props) => (props.loaderVisible ? 'visible' : 'hidden'),
  },
}));

const CategoryPanel = (props) => {
  const { id, name, onChange, expanded } = props;

  const [loadMore, setLoadMore] = useState(false);
  const classes = useStyles({ loaderVisible: loadMore });
  const [panelInfo, setPanelInfo] = useState({
    visible: false,
    text: '',
    component: (text) => (
      <Alert className={classes.panelInfo} icon={false}>
        {text}
      </Alert>
    ),
  });
  const { observedEntry, setDomNode, setRootNode } = useIntersectionObserver({
    threshold: 0.9,
  });

  useEffect(() => {
    if (observedEntry?.isIntersecting) setLoadMore(true);
    else setLoadMore(false);
  }, [observedEntry]);

  const generateContentContainerId = (name) => `${name.replace(' ', '-')}-grid`;

  const panelSummaryProps = (name) => ({
    'aria-controls': generateContentContainerId(name),
    className: 'panel-summary',
    id,
  });

  const togglePanelInfo = (text) => {
    setPanelInfo({ ...panelInfo, visible: true, text });
    setTimeout(() => {
      setPanelInfo({ ...panelInfo, visible: false, text: '' });
    }, 1100);
  };

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

        {panelInfo.visible && panelInfo.component(panelInfo.text)}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        id={generateContentContainerId(name)}
        ref={setRootNode}
        className={classes.productPane}
      >
        <CategoryProducts
          endRef={setDomNode}
          category={name}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
          togglePanelInfo={togglePanelInfo}
        />
        <CircularProgress className={classes.loader} size='1.5rem' />
      </ExpansionPanelDetails>
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
