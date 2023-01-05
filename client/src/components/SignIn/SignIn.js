import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiInputBase from '@mui/material/InputBase';
import MuiLink from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';

import Button from '../Button';
import PasswordInput from '../PasswordInput';

import authenticationApi from '../../api/authentication';
import AuthenticationContext from '../../contexts/AuthenticationContext';

const StyledSignIn = styled(MuiContainer)`
  &.SignIn-root {
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
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;

      .MuiInputBase-input {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
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
    }
  };

  if (authenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <StyledSignIn className="SignIn-root" maxWidth="sm" align="center">
      <MuiTypography variant="h1">Please sign in</MuiTypography>
      <form onSubmit={handleSubmit}>
        <MuiBox className="SignIn-inputGroup">
          <MuiInputBase
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
  );
};

export default SignIn;
