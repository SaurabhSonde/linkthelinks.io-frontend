import React, { useState, useEffect, useContext } from 'react';
import dashStyle from '../../styles/dashboard.module.css';
import { isAuthenticated } from '../../apiHelpers/authHelper';
import Link from 'next/link';
import { getUserById } from '../../apiHelpers/statisticsHelper';
import Head from 'next/head';
import AppContext from '../../store/DataProvider';
import Center from '../../components/Center';

const userDashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();

  const context = useContext(AppContext);

  const changeTheContainers = (centerContainer) => {
    context.changeCenterContainer(centerContainer);
  };

  const loadUserInfo = () => {
    getUserById(user._id, token).then((data) => {
      if (data.error) {
        setSuccess(false);
        setError(data.error);
      } else {
        setError(false);
        setUserInfo(data);
      }
    });
  };

  useEffect(() => {
    loadUserInfo();
    changeTheContainers('home');
  }, []);

  const navigation = () => {
    return (
      <div>
        <div className={dashStyle.nav}>
          <div className={dashStyle.profile}>
            <img src={user.profilePic} alt="profile pic" />
            <span>{user.name}</span>
          </div>
          <div className={dashStyle.navLinks}>
            <button
              className={dashStyle.btn}
              onClick={() => changeTheContainers('home')}
            >
              <img src="/home.svg" />
              <span>Home</span>
            </button>
            <button
              className={dashStyle.btn}
              onClick={() => changeTheContainers('links')}
            >
              <img src="/links.svg" />
              <span>Links</span>
            </button>
            <button className={dashStyle.btn}>
              <img src="/profile.svg" />
              <span>Profile</span>
            </button>
            <button className={dashStyle.btn}>
              <img src="/socialmedia.svg" />
              <span>Social Media</span>
            </button>
            <button className={dashStyle.btn}>
              <img src="/analytics.svg" />
              <span>Analytics</span>
            </button>
            <button className={dashStyle.btn}>
              <img src="/settings.svg" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const blackAnalytics = () => {
    return (
      <div>
        <div className={dashStyle.analytics}>
          <h1>Statistics</h1>
          <div className={dashStyle.statistics}>
            <button className={dashStyle.btnAnalytics}>
              <img src="/TotalLinks.svg" />
              <span title="Total Links" className={dashStyle.tooltip}>
                {userInfo.totalClicks}
              </span>
            </button>
            <button className={dashStyle.btnAnalytics}>
              <img src="/Visitors.svg" />
              <span title="New Visitors" className={dashStyle.tooltip}>
                {userInfo.visitors}
              </span>
            </button>
            <button className={dashStyle.btnAnalytics}>
              <img src="/TotalClicks.svg" />
              <span title="Total Clicks" className={dashStyle.tooltip}>
                {userInfo.totalClicks}
              </span>
            </button>
            <button className={dashStyle.btnAnalytics}>
              <img src="/Share.svg" />
              <span>Share Stats</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={dashStyle.dashboard}>
      <Head>
        <title>@{user.userName}</title>
      </Head>
      {navigation()}
      <Center />
      {blackAnalytics()}
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}

export default userDashboard;
