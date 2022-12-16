import * as React from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
import MuiInputBase from '@mui/material/InputBase';
import MuiLink from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';

import authenticationApi from '../api/authentication';
import AuthenticationContext from '../contexts/AuthenticationContext';

const StyledSignin = styled(MuiContainer)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Signin = (props) => {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticationApi.post('/signin', {
        email,
        password,
      });

      setToken(response.data.token);
      setAuthenticated(true);
      toast('Sign in successful', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response.data, {
        type: 'error',
      });
    }
  };

  return (
    <StyledSignin maxWidth="sm" align="center">
      <MuiTypography variant="h1">Please sign in</MuiTypography>
      <MuiFormControl onSubmit={handleSubmit}>
        <MuiFormGroup>
          <MuiInputBase
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email address"
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <MuiInputBase
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
          />
        </MuiFormGroup>
        <MuiButton variant="contained" size="medium">
          Sign in
        </MuiButton>
      </MuiFormControl>
      <MuiBox>
        No account ? <MuiLink href="/register">Create one here</MuiLink>
      </MuiBox>
    </StyledSignin>
  );
};

export default Signin;
