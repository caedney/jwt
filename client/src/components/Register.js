import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiIconButton from '@mui/material/IconButton';
import MuiInputAdornment from '@mui/material/InputAdornment';
import MuiInputBase from '@mui/material/InputBase';
import MuiLink from '@mui/material/Link';
import MuiSvgIcon from '@mui/material/SvgIcon';
import MuiTypography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import authenticationApi from '../api/authentication';
import AuthenticationContext from '../contexts/AuthenticationContext';

const StyledRegister = styled(MuiContainer)`
  &.Register-root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .SignIn-inputGroup {
      margin-bottom: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      overflow: hidden;
      display: flex;
      flex-direction: column;
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((visible) => !visible);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    <StyledRegister className="Register-root" maxWidth="sm" align="center">
      <MuiTypography variant="h1">Please register</MuiTypography>
      <form onSubmit={handleSubmit}>
        <MuiBox className="SignIn-inputGroup">
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
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            endAdornment={
              <MuiInputAdornment position="start">
                <MuiIconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  color="primary"
                >
                  <MuiSvgIcon
                    fontSize="small"
                    component={
                      showPassword ? VisibilityOffIcon : VisibilityIcon
                    }
                  />
                </MuiIconButton>
              </MuiInputAdornment>
            }
          />
        </MuiBox>
        <MuiButton variant="contained" size="medium">
          Create Account
        </MuiButton>
      </form>
      <MuiBox>
        Already registered ?{' '}
        <MuiLink
          onClick={() => {
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
