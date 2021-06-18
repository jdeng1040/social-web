import React, { useRef } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";


export default function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form action="">
        <h1>Sign In Page</h1>
        <div style={styles.emailPasswordContainer}>
          <input placeholder="Email" ref={emailRef} type="email" />
          <input placeholder="Password" ref={passwordRef} type="password" />
        </div>
        <button onClick={signIn}>Sign In</button>
        <h6>
          Not registered?
          <Link to="/signup">Sign Up!</Link>
        </h6>
      </form>
    </div>
  );
}

const styles = {
  emailPasswordContainer: {
    display: "flex",
    flexDirection: "column",
  },
};
