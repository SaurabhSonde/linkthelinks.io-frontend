import React, { useState } from 'react';
import {
  Signin,
  authenticate,
  isAuthenticated,
} from '../apiHelpers/authHelper';
import signinStyle from '../styles/signin.module.css';
import Router from 'next/router';

const signup = () => {
  const [values, setValues] = useState({
    email: 'a@saurabh.com',
    password: 'Test@12345',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    Signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        Router.push('/admin/dashboard');
      } else {
        Router.push('/user/dashboard');
      }
    }
  };
  const loadingMessage = () => {
    return loading && <h2>Loading</h2>;
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
                Don't have an account?
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
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
    </div>
  );
};
export default signup;
