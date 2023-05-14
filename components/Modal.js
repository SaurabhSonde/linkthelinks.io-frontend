import React from 'react';
import style from '../styles/Modal.module.css';

const Modal = ({ show, close }) => {
  return (
    <>
      {show ? (
        <div className={style.container}>
          <input type="text" placeholder='title goes here' />
          <input type="text" placeholder='url goes here' />
          <textarea
            name=""
            id=""
            cols="43"
            rows="5"
            placeholder='description goes here'
          ></textarea>
          <button>Add</button>
          <button onClick={() => {
            close()
          }}>Close</button>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
