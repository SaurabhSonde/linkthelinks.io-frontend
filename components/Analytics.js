import React, { useState, useEffect } from 'react';
import style from '../styles/analytics.module.css'
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import constant from '../constant';
import jwtDecode from 'jwt-decode'


const Analytics = () => {
    const [userInfo, setUserInfo] = useState({});
    const [mostVisited, setMostVisited] = useState([])
    const [mostVisitedLinks, setMostVisitedLinks] = useState([])
    Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


    console.log(mostVisited)
    useEffect(() => {
        loadUserInfo()
        loadMostVisitedLinksFromBrowser()
        loadMostVisitedLinks()
    }, [])

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


    const loadMostVisitedLinksFromBrowser = async () => {
        try {
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            const response = await axios.get(`${constant.url}/most/visits/browser/${user._id}`, {
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
            setMostVisitedLinks(response.data.data)
        } catch (error) {
            console.log(error)
        }
    };

    const totalData = {
        labels: ['Total Views', 'Total Visitors', 'Clicks Per Day', 'Total Likes'],
        datasets: [
            {
                label: 'Analytics',
                data: [userInfo.totalClicks, userInfo.visitors, userInfo.visitors, 100],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };



    const browserData = {
        labels: ['Chrome', 'Firefox', 'Safari', 'Opera', 'Other'],
        datasets: [
            {
                label: 'Analytics',
                data: [mostVisited.find((browser) => browser.browser === "chrome")?.percentage, mostVisited.find((browser) => browser.browser === "firefox")?.percentage, mostVisited.find((browser) => browser.browser === "safari")?.percentage, mostVisited.find((browser) => browser.browser === "opera")?.percentage, mostVisited.find((browser) => browser.browser !== "chrome" || "opera" || "safari" || "firefox")?.percentage, 100],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };


    const countryData = {
        labels: ['India', 'US', 'Canada', 'Other'],
        datasets: [
            {
                label: 'Analytics',
                data: [mostVisitedLinks.find((country) => country.country === "IN")?.percentage, mostVisitedLinks.find((country) => country.country === "US")?.percentage, mostVisitedLinks.find((country) => country.country === "ca")?.percentage, mostVisited.find((browser) => browser.browser === "Unknown")?.percentage, 100],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                type: 'category',
            },
        },
    };

    return (
        <div className={style.analyticsContainer} >
            <h1>Hello {userInfo.name} 👋🏻</h1>
            <h1>Total Analytics</h1>
            <Bar data={totalData} options={options} />
            <h1>Links Access From Browsers</h1>
            <Bar data={browserData} options={options} />
            <h1>Most Visits From Countries</h1>
            <Bar data={countryData} options={options} />
        </div>
    );
};

export default Analytics;
