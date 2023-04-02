import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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

const StyledRegister = styled(MuiContainer)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .Register-inputGroup {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
  }

  .Register-firstNameInput {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-right: none;
    border-top-left-radius: 6px;
    width: 50%;

    .MuiInputBase-input {
      border-top-left-radius: 5px;
    }
  }

  .Register-lastNameInput {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-top-right-radius: 6px;
    width: 50%;

    .MuiInputBase-input {
      border-top-right-radius: 5px;
    }
  }

  .Register-emailInput {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    width: 100%;
  }

  .PasswordInput-root {
    width: 100%;
  }
`;

const Register = React.forwardRef(function Register(props, ref) {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);

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
      setOpen(true);
      setError(error.response.data.message);
    }
  };

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
      <StyledRegister
        ref={ref}
        className="Register-root"
        maxWidth="sm"
        align="center"
      >
        <MuiTypography variant="h1">Please register</MuiTypography>
        <form onSubmit={handleSubmit}>
          <MuiBox className="Register-inputGroup">
            <Input
              className="Register-firstNameInput"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="first name"
              placeholder="First name"
            />
            <Input
              className="Register-lastNameInput"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="last name"
              placeholder="Last name"
            />
            <Input
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
            Create account
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
    </>
  );
});

export default Register;
