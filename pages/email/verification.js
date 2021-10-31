import React from "react";
import veriStyle from "../../styles/verification.module.css";

const verification = ({ email }) => {
  console.log(email);
  return (
    <div>
      <div className={veriStyle.headings}>
        <h1>Verify your email</h1>
        <span>You will need to verify your email to complete signup.</span>
        <img src="/mailbox.svg" alt="mailbox" />
        <div className={veriStyle.para}>
          <span>
            An email has been sent to your email address with a link to verify
            your account.If you have not received the email, please check your
            spam folder.
          </span>
        </div>
        <div className={veriStyle.buttons}>
          <button>Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default verification;
