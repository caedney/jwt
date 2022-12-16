import { createTheme, css } from '@mui/material/styles';

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
      dark: '#1f70eb',
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          marginBottom: '16px',
        },
        sizeMedium: {
          fontSize: '1.0625rem',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
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
    MuiFormGroup: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          overflow: 'hidden',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        input: {
          'padding': '12px 16px',
          '&::-webkit-input-placeholder': {
            opacity: 0.56,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        gutterBottom: true,
      },
      styleOverrides: {
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
