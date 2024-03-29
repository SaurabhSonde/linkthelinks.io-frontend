import React, { useState } from "react";
import userPageStyle from "../styles/userPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Head from "next/head";
import constant from '../constant';


export const getServerSideProps = async (ctx) => {
  try {
    const response = await axios.get(`${constant.url}/${ctx.params.userPage}`);
    const { data } = response;

    if (data.error) {
      return {
        notFound: true,
      };
    }

    return {
      props: { userPage: data },
    };
  } catch (error) {
    console.error("Error fetching user page:", error);
    return {
      notFound: true,
    };
  }
};

const likeClick = async (linkId) => {
  try {
    await axios.put(`${constant.url}/like/${linkId}`)
    likeToast()
  } catch (error) {
    console.log(error)
    toast.error("Opps, something went wrong!")
  }
};

const likeToast = () => {
  toast("Like❤️", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const userPage = ({ userPage }) => {
  return (
    <div>
      <Head>
        <title>@{userPage.user.userName} - Link In The Bio</title>
        <meta
          name="description"
          content={userPage.user.bio}
        />
        <style>
          {`body { background-color: ${userPage.user.backgroundColor};}`}
        </style>
      </Head>

      <ToastContainer />
      <div className={userPageStyle.profilePic}>
        <img src='https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=f05c14dd4db49f08a789e6449604c490'></img>
        <span>@{userPage.user.userName}</span>
      </div>
      <div className={userPageStyle.socialMedia}>
        {userPage.user.socialLinks.map((sociallink, index) => {
          return (
            <div key={index}>
              {sociallink.socialMedia === "Instagram" ? (
                <img src="/instagram.svg" alt="social media" onClick={() => {
                  window.open(sociallink.url)
                }} />
              ) : (
                ""
              )}

              {sociallink.socialMedia === "Facebook" ? (
                <img src="/facebook.svg" alt="social media" onClick={() => {
                  window.open(sociallink.url)
                }} />
              ) : (
                ""
              )}
              {sociallink.socialMedia === "Twitter" ? (
                <img src="/twitter.svg" alt="social media" onClick={() => {
                  window.open(sociallink.url)
                }} />
              ) : (
                ""
              )}

              {sociallink.socialMedia === "LinkedIn" ? (
                <img src="/linkedin.svg" alt="social media" onClick={() => {
                  window.open(sociallink.url)
                }} />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>

      <div className={userPageStyle.bio}>
        <p>{userPage.user.bio}</p>
      </div>
      <div className={userPageStyle.linkDiv}>
        {userPage.links.map((link, index) => {
          return (
            <div className={userPageStyle.link} key={index}>
              <span onClick={() => {
                window.open(link.shortUrl)
              }} style={{
                cursor: "pointer"
              }}>{link.title}</span>
              <img
                src="/thumbs-up.svg"
                alt="like"
                onClick={() => likeClick(link._id)}
              />
            </div>
          );
        })}
      </div>
      <a href="http://localhost:3000" className={userPageStyle.float}>
        <img
          src="/floating.svg"
          alt="floating"
          className={userPageStyle.myfloat}
        />
      </a>
    </div>
  );
};

export default userPage;
