import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

import Button from '../Button';
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
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    async function getName() {
      try {
        const response = await dashboardApi.get('/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    }

    getName();
  }, [token]);

  const signout = (e) => {
    e.preventDefault();
    setToken('');
    setAuthenticated(false);
    navigate('/sign-in');
  };

  if (!authenticated) {
    return <Navigate replace to="/sign-in" />;
  }

  return (
    <StyledDashboard className="Dashboard-root" maxWidth="sm" align="center">
      <MuiTypography variant="h1">{`Welcome ${firstName} ${lastName}`}</MuiTypography>
      <MuiTypography className="Dashboard-welcome">{email}</MuiTypography>
      <Button variant="contained" size="medium" onClick={signout}>
        Sign out
      </Button>
    </StyledDashboard>
  );
};

export default Dashboard;
