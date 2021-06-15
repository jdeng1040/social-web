import React, { useRef } from "react";
import { auth } from "../firebase";

export default function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
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
          <span onClick={signUp} className="signin__link">
            Sign up
          </span>
        </h6>
      </form>
    </div>
  );
}

const styles = {
    emailPasswordContainer: {
        display: "flex",
        flexDirection: "column"
    }
}
