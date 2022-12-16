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

const StyledSignIn = styled(MuiContainer)`
  &.SignIn-root {
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

const SignIn = (props) => {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();

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
      const response = await authenticationApi.post('/sign-in', {
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
    <StyledSignIn className="SignIn-root" maxWidth="sm" align="center">
      <MuiTypography variant="h1">Please sign in</MuiTypography>
      <form onSubmit={handleSubmit}>
        <MuiBox className="SignIn-inputGroup">
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
          Sign in
        </MuiButton>
      </form>
      <MuiBox>
        No account ?{' '}
        <MuiLink
          onClick={() => {
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
