import * as React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import authenticationApi from '../api/authentication';
import AuthenticationContext from '../contexts/AuthenticationContext';

const Register = () => {
  const { setAuthenticated, setToken } = React.useContext(
    AuthenticationContext
  );

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-3"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          name="first name"
          placeholder="first name"
        />
        <input
          className="form-control my-3"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="last name"
          placeholder="last name"
        />
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
        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
