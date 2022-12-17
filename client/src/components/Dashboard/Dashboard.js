import * as React from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

import dashboardApi from '../../api/dashboard';
import AuthenticationContext from '../../contexts/AuthenticationContext';

const StyledDashboard = styled(MuiContainer)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Dashboard = () => {
  const { token, setToken, setAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const signout = (e) => {
    e.preventDefault();
    setToken('');
    setAuthenticated(false);
    toast('User logged out', {
      type: 'success',
    });
  };

  React.useEffect(() => {
    async function getName() {
      try {
        const response = await dashboardApi.get('/', {
          headers: { token },
        });

        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
      } catch (error) {
        toast(error.response.data, {
          type: 'error',
        });
      }
    }

    getName();
  }, [token]);

  return (
    <StyledDashboard maxWidth="sm" align="center">
      <MuiTypography variant="h1">Welcome back</MuiTypography>
      <MuiTypography>{`${firstName} ${lastName}`}</MuiTypography>
      <MuiButton variant="contained" size="medium" onClick={signout}>
        Sign out
      </MuiButton>
    </StyledDashboard>
  );
};

export default Dashboard;
