const commonArgs = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: { width: '100%' },
        body: { WebkitFontSmoothing: 'auto', width: '100%' },
        '*, *:after, *:before': { boxSizing: 'border-box' },
        '.full-height': { minHeight: 'calc(100vh - 10rem)' },
      },
    },
    MuiButton: {
      containedPrimary: { transform: 'skew(-15deg)' },
      outlinedPrimary: { transform: 'skew(-15deg)' },
    },
  },
};

/**
 * @type {import("@devskope/use-mui-theme/lib/useMuiTheme").UseMuiThemeConfig}
 */
const dark = {
  themeOptions: {
    name: 'yellow-darkness',
    palette: {
      type: 'dark',
      primary: {
        main: '#FFC107',
      },
    },
  },
  themeArgs: [commonArgs],
  responsiveFonts: true,
  fontOptions: { factor: 1 },
};

/**
 * @type {import("@devskope/use-mui-theme/lib/useMuiTheme").UseMuiThemeConfig}
 */
const light = {
  themeOptions: {
    name: 'bight-scene',
    palette: {
      type: 'light',
      primary: {
        main: '#1976d2',
      },
    },
  },
  themeArgs: [commonArgs],
  responsiveFonts: true,
  fontOptions: { factor: 1 },
};

export default { dark, light };
