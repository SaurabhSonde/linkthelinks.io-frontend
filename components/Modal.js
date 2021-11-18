import React from 'react';
import { isAuthenticated } from '../apiHelpers/authHelper';
import { deleteLink } from '../apiHelpers/linkHelper';
import style from '../styles/Modal.module.css';

const Modal = ({ show, close, link }) => {
  const { user, token } = isAuthenticated();
  return (
    <>
      {show ? (
        <div className={style.container}>
          <input type="text" value={link.originalUrl} />
          <input type="text" value={link.title} />
          <textarea
            name=""
            id=""
            cols="43"
            rows="5"
            value={link.description}
          ></textarea>
          <div>
            <button>Edit</button>
            <button
              onClick={() => {
                deleteLink(link._id, user._id, token);
              }}
            >
              Delete
            </button>
          </div>
          <div>
            <button>{link.clicks} Clicks</button>
            <button onClick={() => close()}>Close</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
