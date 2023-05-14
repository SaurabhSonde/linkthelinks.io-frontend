import React, { useContext, useState } from 'react';
import AppContext from '../store/DataProvider';
import AllLinks from './AllLinks';
import Home from './Home';
import Profile from './Profile';
import SocialMedia from './SocialMedia';

const Center = () => {
  const context = useContext(AppContext);
  return (
    <div>
      {context.centerContainer === 'links' ? <AllLinks /> : null}
      {context.centerContainer === 'home' ? <Home /> : null}
      {context.centerContainer === "profile" ? <Profile /> : null}
      {context.centerContainer === "socialmedia" ? <SocialMedia /> : null}
    </div>
  );
};

export default Center;
