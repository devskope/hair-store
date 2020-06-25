export const sectionSpacing = (theme) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
});

export const homeGridStyles = (theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  container: {
    ...sectionSpacing(theme),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2),
    },
  },
  gridLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      '& svg': {
        display: 'none',
      },
    },
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto',
      padding: '0.8rem 0 1.5rem',
      marginTop: '-1rem',
    },
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'nowrap',
      marginLeft: '-1rem',
    },
  },
});
