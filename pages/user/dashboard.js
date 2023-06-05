import React, { useState, useEffect, useContext } from 'react';
import dashStyle from '../../styles/dashboard.module.css';
import Head from 'next/head';
import AppContext from '../../store/DataProvider';
import Center from '../../components/Center';
import Router from "next/router";
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import constant from '../../constant';


const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState({});

  const context = useContext(AppContext);

  const changeTheContainers = (centerContainer) => {
    context.changeCenterContainer(centerContainer);
  };

  const loadUserInfo = async () => {
    try {
      const token = localStorage.getItem('token')
      const user = jwtDecode(token)
      const response = await axios.get(`${constant.url}/user/${user._id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      setUserInfo(response.data)
    } catch (error) {
      console.log(error)
    }
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
            {/* <img src={user.profilePic} alt="profile pic" /> */}
            <span>{userInfo.name}</span>
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
            <button className={dashStyle.btn} onClick={() => changeTheContainers('profile')}>
              <img src="/profile.svg" />
              <span>Profile</span>
            </button>
            <button className={dashStyle.btn} onClick={() => changeTheContainers('socialmedia')}>
              <img src="/socialmedia.svg" />
              <span>Social Media</span>
            </button>
            <button className={dashStyle.btn} onClick={() => changeTheContainers('addlinks')}>
              <img src="/addlinks.svg" />
              <span>Add Links</span>
            </button>
            <button className={dashStyle.btn} onClick={() => changeTheContainers('analytics')}>
              <img src="/analytics.svg" />
              <span>Analytics</span>
            </button>
            <button className={dashStyle.btn} onClick={() => {
              localStorage.clear()
              Router.push('/signin')
            }}>
              <img src="/settings.svg" />
              <span>Log Out</span>
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
            <button className={dashStyle.btnAnalytics} onClick={() => {
              window.open(`https://web.whatsapp.com/send?text=
              Link In The Bio Stats
              Total Clicks=${userInfo?.totalClicks}
              Per Day Clicks=${userInfo?.perDayClicks}
              Visitors=${userInfo?.visitors}
              `)
            }}>
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
        <title>@{userInfo.userName}</title>
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

export default UserDashboard;
