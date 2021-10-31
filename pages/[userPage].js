import React, { useState } from "react";
import userPageStyle from "../styles/userPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";

export const getServerSideProps = async (ctx) => {
  const user = await fetch(`http://localhost:5000/api/${ctx.params.userPage}`);

  const userPage = await user.json();

  if (userPage.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { userPage },
  };
};

const likeClick = async (linkId) => {
  return fetch(`http://localhost:5000/api/like/${linkId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      likeToast();
      return response.json();
    })
    .catch((err) => console.log(err));
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
        <title>@{userPage.user.userName}</title>
        <style>
          {`body { background-color: ${userPage.user.backgroundColor};}`}
        </style>
      </Head>

      <ToastContainer />
      <div className={userPageStyle.profilePic}>
        <img src={userPage.user.profilePic}></img>
        <span>@{userPage.user.userName}</span>
      </div>
      <div className={userPageStyle.socialMedia}>
        {userPage.user.socialLinks.map((sociallink, index) => {
          return (
            <div key={index}>
              {sociallink.socialMedia === "Instagram" ? (
                <img src="/instagram.svg" alt="social media" />
              ) : (
                ""
              )}

              {sociallink.socialMedia === "Facebook" ? (
                <img src="/facebook.svg" alt="social media" />
              ) : (
                ""
              )}
              {sociallink.socialMedia === "Twitter" ? (
                <img src="/twitter.svg" alt="social media" />
              ) : (
                ""
              )}

              {sociallink.socialMedia === "LinkedIn" ? (
                <img src="/linkedin.svg" alt="social media" />
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
              <a href={link.shortUrl}>{link.title}</a>
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
