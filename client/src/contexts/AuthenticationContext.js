import * as React from 'react';
import authenticationApi from '../api/authentication';
import useLocalStorage from '../utils/useLocalStoarge';

const AuthenticationContext = React.createContext();

export const AuthenticationProvider = (props) => {
  const { children } = props;

  const [authenticated, setAuthenticated] = React.useState();
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
        let verified = false;

        if (token) {
          const response = await authenticationApi.get('/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });

          verified = response.data.verified;
        }

        setAuthenticated(verified);
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
      }
    }

    isAuthenticated();
  }, [token]);

  if (typeof authenticated !== 'boolean') {
    return null;
  }

  return (
    <AuthenticationContext.Provider value={authentication}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
