import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tagCloud: {
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: theme.spacing(2),
    alignSelf: 'center',
    maxWidth: '450px',
    minWidth: '40%',
    padding: theme.spacing(1.5),
    paddingBottom: 0,
    '& > *': {
      marginBottom: theme.spacing(1.5),
      color: 'inherit',
    },
    '& > :not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));

const TagCloud = (props) => {
  const { loading, tags } = props;

  const classes = useStyles({ tagCount: tags.length + 1 });

  if (loading)
    return (
      <Paper className={classes.tagCloud} variant='outlined'>
        <Typography align='center'>Loading</Typography>
      </Paper>
    );

  return (
    <Paper className={classes.tagCloud} variant='outlined'>
      {tags.map(({ name }, i) => (
        <Chip key={i} label={name} color='primary' variant='outlined' />
      ))}
    </Paper>
  );
};

TagCloud.defaultProps = {
  loading: false,
  tags: [],
};

TagCloud.proptypes = {
  loading: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
};

export default TagCloud;
