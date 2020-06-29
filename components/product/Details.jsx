import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles, useTheme } from '@material-ui/core';
import { useState } from 'react';

import TabPanel from '../common/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'none',
  },
}));

function a11yProps(index) {
  return {
    id: `detail-tab-${index}`,
    'aria-controls': `detail-tabpanel-${index}`,
  };
}

const Details = (props) => {
  const { loading, product } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [currenTab, setCurrentTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const handleIndexChange = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className={classes.root}>
      <Paper variant='outlined' square>
        <Tabs
          value={currenTab}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='inherit'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='full width tabs example'
        >
          <Tab label='Description' {...a11yProps(0)} />
          <Tab label='Reviews' {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <SwipeableViews
        animateTransitions={false}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currenTab}
        onChangeIndex={handleIndexChange}
      >
        <TabPanel
          aria-labelledby={'full-width-tab-0'}
          id={'detail-tabpanel-0'}
          index={0}
          value={currenTab}
          dir={theme.direction}
        >
          <ReactMarkdown source={product?.description} />
        </TabPanel>
        <TabPanel
          aria-labelledby={'full-width-tab-1'}
          id={'detail-tabpanel-1'}
          index={1}
          value={currenTab}
          dir={theme.direction}
        >
          <p>No reviews yet!</p>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

Details.proptypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
};

export default Details;
