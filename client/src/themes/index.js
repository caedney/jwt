import { createTheme, css, alpha } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

theme = createTheme(theme, {
  palette: {
    mode: 'light',
    primary: {
      main: '#2d7cf6',
      dark: '#276fdb',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          'textTransform': 'none',
          'marginBottom': '16px',
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        },
        sizeMedium: {
          fontSize: '1.0625rem',
          padding: '6px 20px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: css`
        body {
          background-color: ${theme.palette.grey[100]};
        }

        strong,
        b {
          font-weight: ${theme.typography.fontWeightSemiBold};
        }
      `,
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transitionProperty:
            'background-color, box-shadow, border-color, color',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        input: {
          'transitionProperty': 'box-shadow',
          'transitionDuration': `${theme.transitions.duration.short}ms`,
          'transitionTimingFunction': theme.transitions.easing.easeInOut,
          'height': '1.5em',
          'padding': '12px 16px',
          '&::-webkit-input-placeholder': {
            opacity: 0.56,
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.25)}`,
            zIndex: 1,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          'textDecoration': 'none',
          'transitionProperty': 'color, box-shadow',
          'transitionDuration': `${theme.transitions.duration.short}ms`,
          'transitionTimingFunction': theme.transitions.easing.easeInOut,
          'cursor': 'pointer',
          'borderRadius': '3px',
          '&:hover': {
            color: theme.palette.text.primary,
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '4px',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        gutterBottom: true,
      },
      styleOverrides: {
        gutterBottom: {
          marginBottom: '0.5em',
        },
        h1: {
          fontSize: '2.125rem',
          fontWeight: 600,
          lineHeight: 1.25,
        },
      },
    },
  },
});

export default theme;
