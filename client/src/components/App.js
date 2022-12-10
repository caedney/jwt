import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

import authenticationApi from '../api/authentication';
import AuthenticationContext from '../contexts/AuthenticationContext';
import useLocalStorage from '../utils/useLocalStoarge';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [token, setToken] = useLocalStorage('jwtToken', '');

  const authentication = {
    authenticated,
    setAuthenticated,
    token,
    setToken,
  };

  React.useEffect(() => {
    async function isAuthenticated() {
      try {
        const response = await authenticationApi.get('/verified', {
          headers: { token },
        });

        setAuthenticated(response.data.verified);
      } catch (error) {
        toast(error.response.data, {
          type: 'error',
        });
      }
    }

    isAuthenticated();
  }, [token]);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <div className="App">
        <div className="container" style={{ maxWidth: '480px' }}>
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  !authenticated ? (
                    <Login />
                  ) : (
                    <Navigate replace to="/dashboard" />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  !authenticated ? (
                    <Register />
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  authenticated ? (
                    <Dashboard />
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
            </Routes>
          </Router>
        </div>
        <ToastContainer />
      </div>
    </AuthenticationContext.Provider>
  );
}

export default App;
