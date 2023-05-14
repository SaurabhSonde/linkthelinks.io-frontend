import React, { useState, useEffect } from 'react'
import style from '../styles/profile.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import constant from '../constant';
import jwtDecode from 'jwt-decode'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [infoUpdate, setInfoUpdate] = useState({
        name: "",
        email: "",
        bio: ""
    })

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
            setUserInfo(response.data)
            setInfoUpdate({
                email: response.data.email,
                name: response.data.name,
                bio: response.data.bio
            })
        } catch (error) {
            console.log(error)
        }
    };


    const updateInfo = async () => {
        try {
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            let body = {
                name: infoUpdate?.name,
                email: infoUpdate?.email,
                bio: infoUpdate?.bio
            }
            await axios.put(`${constant.url}/user/update/profile/${user._id}`, body, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success('Profile info updated successfully.')

        } catch (error) {
            toast.error('Opps, something went wrong.')
        }
    }

    return (
        <div className={style.profileContainer}>
            <h1>Hello {userInfo.name} 👋🏻</h1>

            <div className={style.infoContainer}>
                <input type="text" value={userInfo.userName} disabled />
                <input type="text" value={infoUpdate?.name} onChange={(e) => {
                    setInfoUpdate({ ...infoUpdate, name: e.target.value })
                }} placeholder='Your name goes here' />
                <input type="text" value={infoUpdate?.email} onChange={(e) => {
                    setInfoUpdate({ ...infoUpdate, email: e.target.value })
                }} placeholder='Your email goes here' />
                <textarea type="text" value={infoUpdate?.bio} placeholder='Your bio goes here' onChange={(e) => {
                    setInfoUpdate({ ...infoUpdate, bio: e.target.value })
                }} />
                <button onClick={() => {
                    updateInfo()
                }}>Update</button>
            </div>
        </div>
    );
}

export default Profile;