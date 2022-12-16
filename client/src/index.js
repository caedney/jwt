import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Register from './components/Register';

import authenticationApi from './api/authentication';
import AuthenticationContext from './contexts/AuthenticationContext';
import useLocalStorage from './utils/useLocalStoarge';
import theme from './themes';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [token, setToken] = useLocalStorage('jwtToken');

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </AuthenticationContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
