import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

import dashboardApi from '../../api/dashboard';
import AuthenticationContext from '../../contexts/AuthenticationContext';

const StyledDashboard = styled(MuiContainer)`
  &.Dashboard-root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .Dashboard-welcome {
      font-size: 1.5rem;
      margin-bottom: 1em;
    }
  }
`;

const Dashboard = () => {
  const { token, setToken, authenticated, setAuthenticated } = React.useContext(
    AuthenticationContext
  );

  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const signout = (e) => {
    e.preventDefault();
    setToken('');
    setAuthenticated(false);
    navigate('/sign-in');
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
        console.log(error);
      }
    }

    getName();
  }, [token]);

  if (!authenticated) {
    return <Navigate replace to="/sign-in" />;
  }

  return (
    <StyledDashboard className="Dashboard-root" maxWidth="sm" align="center">
      <MuiTypography variant="h1">Dashboard</MuiTypography>
      <MuiTypography className="Dashboard-welcome">
        Welcome <strong>{`${firstName} ${lastName}`}</strong>
      </MuiTypography>
      <MuiButton variant="contained" size="medium" onClick={signout}>
        Sign out
      </MuiButton>
    </StyledDashboard>
  );
};

export default Dashboard;
