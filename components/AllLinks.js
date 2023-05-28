import React, { useEffect, useState } from 'react'
import style from '../styles/alllinks.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from './Modal';
import constant from '../constant';
import jwtDecode from 'jwt-decode'


const AllLinks = () => {
    const [userInfo, setUserInfo] = useState({});
    const [links, setLinks] = useState([])
    const [showModal, setShowModal] = useState(false)

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

    const getAllLinks = async () => {
        try {
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            const response = await axios.get(`${constant.url}/links/${user._id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            setLinks(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteLink = async (linkId) => {
        try {
            const token = localStorage.getItem('token')
            const user = jwtDecode(token)
            await axios.delete(`${constant.url}/remove/link/user/${linkId}/${user._id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success("Link deleted successfully.")
        } catch (error) {
            toast.success("Failed to delete link.")
            console.log(error)
        }
    }



    useEffect(() => {
        loadUserInfo()
        getAllLinks()
    }, [])

    const close = () => {
        setShowModal(false)
    }
    return (
        <div className={style.allLinksContainer}>
            <h1>Hello {userInfo.name}👋🏻</h1>

            <div className={style.linksContainer}>
                <Modal show={showModal} close={close} />
                {links.map((data, index) => {
                    return <div className={style.link} key={index}>
                        <span>{data.title}</span>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" onClick={() => {
                            deleteLink(data._id)
                        }}><path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </div>
                })}
            </div>

            <div className={style.addLinkButtonContainer}>
                <button onClick={() => {
                    setShowModal(true)
                }}>
                    Add Link
                </button>
            </div>

        </div>
    );
}

export default AllLinks;