import React, { useContext, useState } from 'react';
import AppContext from '../store/DataProvider';
// import AllLinks from './AllLinks';
import Home from './Home';

const Center = () => {
  const context = useContext(AppContext);
  return (
    <div>
      {/* {context.centerContainer === 'links' ? <AllLinks /> : null} */}
      {context.centerContainer === 'home' ? <Home /> : null}
    </div>
  );
};

export default Center;
