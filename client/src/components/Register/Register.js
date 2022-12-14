import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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

const StyledRegister = styled(MuiContainer)`
  &.Register-root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .Register-inputGroup {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
    }

    .Register-firstNameInput {
      flex-grow: 1;
      border: 1px solid #ccc;
      border-right: none;
      border-top-left-radius: 6px;

      .MuiInputBase-input {
        border-top-left-radius: 5px;
      }
    }

    .Register-lastNameInput {
      flex-grow: 1;
      border: 1px solid #ccc;
      border-top-right-radius: 6px;

      .MuiInputBase-input {
        border-top-right-radius: 5px;
      }
    }

    .Register-emailInput {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  }
`;

const Register = () => {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();
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

      console.log('Registration successful');
      setToken(response.data.accessToken);
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledRegister className="Register-root" maxWidth="sm" align="center">
      <MuiTypography variant="h1">Please register</MuiTypography>
      <form onSubmit={handleSubmit}>
        <MuiBox className="Register-inputGroup">
          <MuiBox display="flex">
            <MuiInputBase
              className="Register-firstNameInput"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="first name"
              placeholder="First name"
            />
            <MuiInputBase
              className="Register-lastNameInput"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="last name"
              placeholder="Last name"
            />
          </MuiBox>
          <MuiInputBase
            className="Register-emailInput"
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
          Create Account
        </Button>
      </form>
      <MuiBox>
        Already registered ?{' '}
        <MuiLink
          href="/sign-in"
          onClick={(e) => {
            e.preventDefault();
            navigate('/sign-in');
          }}
        >
          Sign in here
        </MuiLink>
      </MuiBox>
    </StyledRegister>
  );
};

export default Register;
