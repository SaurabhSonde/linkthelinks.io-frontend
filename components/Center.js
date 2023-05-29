import React, { useContext } from 'react';
import AppContext from '../store/DataProvider';
import AllLinks from './AllLinks';
import Home from './Home';
import Profile from './Profile';
import SocialMedia from './SocialMedia';
import AddLinks from './AddLinks';
import Analytics from './Analytics';

const Center = () => {
  const context = useContext(AppContext);
  return (
    <div>
      {context.centerContainer === 'links' ? <AllLinks /> : null}
      {context.centerContainer === 'home' ? <Home /> : null}
      {context.centerContainer === "profile" ? <Profile /> : null}
      {context.centerContainer === "socialmedia" ? <SocialMedia /> : null}
      {context.centerContainer === "addlinks" ? <AddLinks /> : null}
      {context.centerContainer === "analytics" ? <Analytics /> : null}
    </div>
  );
};

export default Center;
