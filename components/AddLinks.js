import React, { useState, useEffect } from 'react'
import style from '../styles/addlinks.module.css'
import axios from 'axios';
import constant from '../constant';
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify';

const AddLinks = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false)
    const [linkInfo, setLinkInfo] = useState({
        title: '',
        description: '',
        originalUrl: ''
    })


    useEffect(() => {
        loadUserInfo()
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


    const addLinks = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            await axios.post(`${constant.url}/add/link/${user._id}`, linkInfo, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success('Link added successfully.')
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            setLoading(false)
        }
    }

    return (
        <div className={style.addLinkContainer}>
            <h1>Hello {userInfo.name} 👋🏻</h1>
            <div className={style.infoContainer}>
                <input type="text" value={linkInfo.title} placeholder='Your link title goes here' onChange={(e) => {
                    setLinkInfo({ ...linkInfo, title: e.target.value })
                }} />
                <input type="text" value={linkInfo.description} placeholder='Your link description goes here' onChange={(e) => {
                    setLinkInfo({ ...linkInfo, description: e.target.value })
                }} />
                <input type="text" value={linkInfo.originalUrl} placeholder='Your link goes here' onChange={(e) => {
                    setLinkInfo({ ...linkInfo, originalUrl: e.target.value })
                }} />
                {loading ? <button>Loading...</button> : <button onClick={() => {
                    addLinks()
                }}>Add</button>}
            </div>
        </div>
    );
}

export default AddLinks;