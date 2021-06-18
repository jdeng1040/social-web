import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function Signup() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };
  return (
    <div>
      <h1>SignUp Page</h1>
      <form action="">
        <div style={styles.emailPasswordContainer}>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={signUp}>Sign Up</button>
        <h6>
          Already registered?
          <Link to="/signin">Sign In</Link>
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
