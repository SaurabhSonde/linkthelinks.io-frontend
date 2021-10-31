import React, { useState } from "react";
import { Signup } from "../apiHelpers/authHelper";
import signupStyle from "../styles/signup.module.css";
import Router from "next/router";

const signup = () => {
  const [values, setValues] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, userName, email, mobile, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    Signup({ name, userName, email, mobile, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            userName: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
          Router.push("/email/verification");
        }
      })
      .catch(console.log("Error in signup"));
  };
  return (
    <div className={signupStyle.boxes}>
      <div className={signupStyle.boxOne}>
        <div className={signupStyle.logo}>
          <h1>idea</h1>
          <h1>|</h1>
          <h2> Your link destination</h2>
        </div>

        <div className={signupStyle.form}>
          <form>
            <input
              type="text"
              placeholder="Name"
              onChange={handleChange("name")}
              value={name}
            />
            <input
              type="text"
              placeholder="UserName"
              onChange={handleChange("userName")}
              value={userName}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange("email")}
              value={email}
            />
            <input
              type="text"
              placeholder="Mobile"
              onChange={handleChange("mobile")}
              value={mobile}
            />
            <input
              type="text"
              placeholder="Password"
              onChange={handleChange("password")}
              value={password}
            />
            <button onClick={onSubmit}>Create My Account</button>
            <p>
              By registering you agree to our
              <a>Terms of Service, Privacy Policy</a>
              and our
              <a>Acceptable Use Policy.</a>
            </p>
          </form>
        </div>
      </div>

      <div className={signupStyle.boxTwo}>
        <img src="/Blob.svg" alt="" srcset="" />
        <img src="/char.png" alt="" srcset="" />
      </div>
    </div>
  );
};

export default signup;
