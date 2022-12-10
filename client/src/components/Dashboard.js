import * as React from 'react';
import { toast } from 'react-toastify';

import dashboardApi from '../api/dashboard';
import AuthenticationContext from '../contexts/AuthenticationContext';

const Dashboard = () => {
  const { token, setToken, setAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const logout = (e) => {
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
    <>
      <h1 className="text-center my-5">Dashboard</h1>
      <p className="text-center">
        Welcome back <strong>{`${firstName} ${lastName}`}</strong>
      </p>
      <div className="text-center">
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
