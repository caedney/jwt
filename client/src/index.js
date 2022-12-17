import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import Register from './components/Register';

import { AuthenticationProvider } from './contexts/AuthenticationContext';
import theme from './themes';

function App() {
  return (
    <AuthenticationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthenticationProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
