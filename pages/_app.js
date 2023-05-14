import '../styles/globals.css';
import { UserContext } from '../components/user';
import { AppContextProvider } from '../store/DataProvider';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);



  return (
    <AppContextProvider>
      <UserContext.Provider value={user}>
        <ToastContainer />
        <Component {...pageProps} />
      </UserContext.Provider>
    </AppContextProvider>
  );
}

export default MyApp;
