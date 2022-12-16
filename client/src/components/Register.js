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

const StyledRegister = styled(MuiContainer)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Register = () => {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticationApi.post('/register', {
        firstName,
        lastName,
        email,
        password,
      });

      setToken(response.data.token);
      setAuthenticated(true);
      toast('Registration successful', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response.data, {
        type: 'error',
      });
    }
  };

  return (
    <StyledRegister maxWidth="sm" align="center">
      <MuiTypography variant="h1">Please register</MuiTypography>
      <MuiFormControl onSubmit={handleSubmit}>
        <MuiFormGroup>
          <MuiBox display="flex">
            <MuiInputBase
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="first name"
              placeholder="First name"
              style={{ borderBottom: '1px solid #ccc', flexGrow: 1 }}
            />
            <MuiInputBase
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="last name"
              placeholder="Last name"
              style={{
                borderBottom: '1px solid #ccc',
                borderLeft: '1px solid #ccc',
                flexGrow: 1,
              }}
            />
          </MuiBox>
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
          Create Account
        </MuiButton>
      </MuiFormControl>
      <MuiBox>
        Already registered ? <MuiLink href="/sign-in">Sign in here</MuiLink>
      </MuiBox>
    </StyledRegister>
  );
};

export default Register;
