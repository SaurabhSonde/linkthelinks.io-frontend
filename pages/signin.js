import React, { useState } from 'react';
import signinStyle from '../styles/signin.module.css';
import Router from 'next/router';
import axios from 'axios';
import constant from '../constant'


const Signup = () => {
  const [values, setValues] = useState({
    email: 'saurabhsonde111@gmail.com',
    password: 'Saurabh@123',
    error: '',
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      setValues({ ...values, error: false, loading: true });
      const response = await axios.post(`${constant.url}/signin`, { email: values.email, password: values.password })
      localStorage.setItem('token', response.data.token)
      Router.push('/user/dashboard');
    } catch (error) {
      setValues(...values, error.response.data.error)
      console.log(error)
    }
  };


  const errorMessage = () => {
    return <h5>{error}</h5>;
  };

  const signinForm = () => {
    return (
      <div className={signinStyle.boxes}>
        <div className={signinStyle.boxOne}>
          <div className={signinStyle.logo}>
            <h1>idea</h1>
            <h1>|</h1>
            <h2> Your link destination</h2>
          </div>
          <h1>Welcome Back!</h1>
          <div className={signinStyle.form}>
            <form>
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange('email')}
                value={email}
              />

              <input
                type="text"
                placeholder="Password"
                onChange={handleChange('password')}
                value={password}
              />
              <br />
              <br />
              <a href="">Forgot password?</a>
              <button onClick={onSubmit}>Signin</button>
              <p>
                Don&apos;t have an account?
                <a href="">Signup</a>
              </p>
            </form>
          </div>
        </div>

        <div className={signinStyle.boxTwo}>
          <img src="/Blob.svg" alt="blob" />
          <img src="/char.png" alt="char" />
        </div>
      </div>
    );
  };

  return (
    <div>
      {signinForm()}
      {errorMessage()}
    </div>
  );
};
export default Signup;
