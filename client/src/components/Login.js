import * as React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import authenticationApi from '../api/authentication';
import AuthenticationContext from '../contexts/AuthenticationContext';

const Login = (props) => {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticationApi.post('/login', {
        email,
        password,
      });

      setToken(response.data.token);
      setAuthenticated(true);
      toast('Login successful', {
        type: 'success',
      });
    } catch (error) {
      toast(error.response.data, {
        type: 'error',
      });
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="btn btn-success" style={{ width: '100%' }}>
          Submit
        </button>
      </form>
      <div className="text-center my-3">
        <Link className="btn btn-primary" to="/register">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
