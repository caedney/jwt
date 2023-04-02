import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiTypography from '@mui/material/Typography';

import Button from '../Button';
import Input from '../Input';
import PasswordInput from '../PasswordInput';

import authenticationApi from '../../api/authentication';
import AuthenticationContext from '../../contexts/AuthenticationContext';

const StyledSignIn = styled(MuiContainer)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .SignIn-inputGroup {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
  }

  .SignIn-emailInput {
    border: 1px solid #ccc;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    .MuiInputBase-input {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
`;

const SignIn = (props) => {
  const { authenticated, setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticationApi.post('/sign-in', {
        email,
        password,
      });

      console.log('Sign in successful');
      setToken(response.data.accessToken);
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.log(error);
      setOpen(true);
      setError(error.response.data.message);
    }
  };

  if (authenticated) {
    return <Navigate replace to="/" />;
  }

  const onClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  };

  return (
    <>
      <MuiSnackbar
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={4000}
        onClose={onClose}
      >
        <MuiAlert
          severity="error"
          onClose={onClose}
          sx={{ border: '1px solid rgba(95, 33, 32, 0.16)' }}
        >
          <>{error}</>
        </MuiAlert>
      </MuiSnackbar>
      <StyledSignIn className="SignIn-root" maxWidth="sm" align="center">
        <MuiTypography variant="h1">Please sign in</MuiTypography>
        <form onSubmit={handleSubmit}>
          <MuiBox className="SignIn-inputGroup">
            <Input
              className="SignIn-emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email address"
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </MuiBox>
          <Button variant="contained" size="medium" type="submit">
            Sign in
          </Button>
        </form>
        <MuiBox>
          No account ?{' '}
          <MuiLink
            href="/register"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Create one here
          </MuiLink>
        </MuiBox>
      </StyledSignIn>
    </>
  );
};

export default SignIn;
