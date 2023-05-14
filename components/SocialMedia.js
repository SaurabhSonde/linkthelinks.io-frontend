import React, { useState, useEffect } from 'react'
import style from '../styles/socialmedia.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import constant from '../constant';
import jwtDecode from 'jwt-decode'



const SocialMedia = () => {
    const [userInfo, setUserInfo] = useState({});
    const [infoUpdate, setInfoUpdate] = useState({
        socialMedia: "",
        url: ""
    })
    const [socialMedia, setSocialMedia] = useState([])

    useEffect(() => {
        loadUserInfo()
        setInfoUpdate()
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
            setSocialMedia(response.data.socialLinks)
            setUserInfo(response.data)
        } catch (error) {
            console.log(error)
        }
    };


    const addSocialMedia = async () => {
        try {
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            const response = await axios.post(`${constant.url}/add/social/media/${user._id}`, infoUpdate, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            setSocialMedia(response.data.user.socialLinks)
            toast.success('Social Media Added Successfully.')
        } catch (error) {
            toast.error('Opps, something went wrong.')
        }
    }

    console.log(socialMedia)

    const renderSocialMediaIcon = (data) => {
        if (data === 'Facebook') {
            return <img src="/facebook.svg" alt="Facebook" />;
        } else if (data === 'Instagram') {
            return <img src="/instagram.svg" alt="Instagram" />;
        } else if (data === 'Pinterest') {
            return <img src="/pinterest.svg" alt="Pinterest" />;
        } else if (data === 'LinkedIn') {
            return <img src="/linkedin.svg" alt="LinkedIn" />;
        } else if (data === 'Twitter') {
            return <img src="/twitter.svg" alt="Twitter" />;
        } else {
            return null; // or you can render a default icon or message
        }
    };


    return (
        <div className={style.socialMediaContainer}>
            <h1>Hello {userInfo.name} 👋🏻</h1>

            <div className={style.infoContainer}>
                <select onChange={(e) => {
                    setInfoUpdate({ ...infoUpdate, socialMedia: e.target.value })
                }}>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="Linkedin">Linkedin</option>
                </select>
                <input type="text" value={infoUpdate?.url} onChange={(e) => {
                    setInfoUpdate({ ...infoUpdate, url: e.target.value })
                }} placeholder='Your social media link goes here' />
                <button onClick={() => {
                    addSocialMedia()
                }}>Add</button>
            </div>

            <div className={style.linksContainer}>
                <div className={style.header}>
                    <span>Added Social Media</span>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    overflow: "auto",
                    padding: "30px"
                }}>
                    {socialMedia.map((data, index) => {
                        return <div className={style.link} key={index} onClick={() => {
                            window.open(data.url)
                        }}>
                            {renderSocialMediaIcon(data.socialMedia)}
                            <span>{data.url}</span>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;