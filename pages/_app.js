import '../styles/globals.css';
import { UserContext } from '../components/user';
import { AppContextProvider } from '../store/DataProvider';
import { isAuthenticated } from '../apiHelpers/authHelper';
import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      const user = isAuthenticated();
      setUser(user);
    }
  }, []);

  if (pageProps.protected && !user) {
    return <h1>You are not signed in.</h1>;
  }
  if (pageProps.userTypes && pageProps.userTypes.indexOf(user.type) === -1) {
    return <h1>Sorry, you don't have access</h1>;
  }
  return (
    <AppContextProvider>
      <UserContext.Provider value={user}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </AppContextProvider>
  );
}

export default MyApp;
