import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../apiHelpers/authHelper';
import dashStyle from '../styles/dashboard.module.css';
import { getMostClickLinks, getUserById } from '../apiHelpers/statisticsHelper';
const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const [mostClickLinks, setMostClickLinks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();

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

  const loadMostClickLinks = () => {
    getMostClickLinks(user._id, token).then((data) => {
      if (data.error) {
        setSuccess(false);
        setError(data.error);
      } else {
        setError(false);
        setMostClickLinks(data);
      }
    });
  };

  useEffect(() => {
    loadUserInfo();
    loadMostClickLinks();
  }, []);
  return (
    <div className={dashStyle.middleSection}>
      <h1>Hello {user.name}👋🏻</h1>
      <div className={dashStyle.boxOne}>
        <div className={dashStyle.views}>
          <img src="/Views.svg" alt="" />
          <header>Views</header>
          <p> {userInfo.visitors}</p>
          <span>Per Day</span>
        </div>
        <div className={dashStyle.visitors}>
          <img src="/Views.svg" alt="" />
          <header>Visitors</header>
          <p> {userInfo.visitors}</p>
          <span>Per Day</span>
        </div>
        <div className={dashStyle.clicks}>
          <img src="/Views.svg" alt="" />
          <header>Clicks</header>
          <p> {userInfo.totalClicks}</p>
          <span>Per Day</span>
        </div>
      </div>
      <div className={dashStyle.boxContainer}>
        <div className={dashStyle.boxTwo}>
          <img src="/MostClicks.svg" alt="most clicks" />
          <h1>Most Clicks</h1>
          {mostClickLinks.map((link, index) => {
            return (
              <div className={dashStyle.mostClickLinks} key={index}>
                <a href={link.shortUrl}>{link.title}</a>
              </div>
            );
          })}
        </div>
        <div className={dashStyle.boxThree}>
          <img src="/MostVisits.svg" alt="most clicks" />
          <h1>Most Visits</h1>
          {mostClickLinks.map((link, index) => {
            return (
              <div className={dashStyle.mostVisits} key={index}>
                <a href={link.shortUrl}>{link.title}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
