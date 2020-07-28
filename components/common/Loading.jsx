import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  messageBlock: {
    height: 'min-content',
    marginTop: '3rem',
  },
  message: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle',
    '& > h2': {
      fontWeight: 'normal',
      lineHeight: 'inherit',
      margin: 0,
      padding: 0,
    },
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <main className={`full-height ${classes.page}`}>
      <div className={classes.messageBlock}>
        <div className={classes.message}>
          <Typography component='h2' variant='h6'>
            Loading......
          </Typography>
        </div>
      </div>
    </main>
  );
};

export default Loading;
