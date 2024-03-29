import React, { useState, useEffect } from 'react';
import dashStyle from '../styles/dashboard.module.css';
import axios from 'axios'
import constant from '../constant';
import jwtDecode from 'jwt-decode'
const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const [mostClickLinks, setMostClickLinks] = useState([]);
  const [mostVisited, setMostVisited] = useState([])


  useEffect(() => {
    loadUserInfo();
    loadMostClickLinks();
    loadMostVisitedLinks()
  }, []);

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

  const loadMostClickLinks = async () => {
    try {
      const token = localStorage.getItem('token')
      const user = jwtDecode(token)
      const response = await axios.get(`${constant.url}/get/most/clicks/${user._id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      setMostClickLinks(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  const loadMostVisitedLinks = async () => {
    try {
      const token = localStorage.getItem('token')
      const user = jwtDecode(token)
      const response = await axios.get(`${constant.url}/most/visits/country/${user._id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      setMostVisited(response.data.data)
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className={dashStyle.middleSection}>
      <h1>Hello {userInfo.name}👋🏻</h1>
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
          <div className='header'>
            <img src="/MostClicks.svg" alt="most clicks" />
            <h1>Most Clicks</h1>
          </div>
          {mostClickLinks.map((link, index) => {
            return (
              <div className={dashStyle.mostClickLinks} key={index} onClick={() => {
                window.open(link.shortUrl)
              }} style={{
                cursor: "pointer"
              }}>
                <span>{link.title}</span>
              </div>
            );
          })}
        </div>
        <div className={dashStyle.boxThree}>
          <div className="header">
            <img src="/MostVisits.svg" alt="most clicks" />
            <h1>Most Visits</h1>
          </div>
          {mostVisited.map((data, index) => {
            return (
              <div className={dashStyle.mostVisits} key={index} style={{
                cursor: "pointer"
              }}>
                <span>{data.country}</span>
                <span style={{
                  marginLeft: "10px"
                }}>{data.percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
