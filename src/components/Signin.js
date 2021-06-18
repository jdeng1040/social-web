import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";


export default function Signin() {
  const [errorMessage, setMessage] = useState('');
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
        setMessage(err.message);
        //alert(err.message);
        console.log(err);
      });
  };
  return (
    <div>
      <form action="">
        <h1>Sign In Page</h1>
        <h3 style={styles.errorMessage}>{errorMessage}</h3>
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
  errorMessage: {
    color: "red"
  }
};
