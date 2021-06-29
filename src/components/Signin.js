import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { Button, Card, InputGroup, FormControl } from "react-bootstrap";

export default function Signin() {
  const [errorMessage, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        setMessage(err.message);
        console.log(err);
      });
  };
  return (
    <div>
      <h1 style={styles.title}>Welcome to FitNow</h1>
      <Card style={styles.card}>
        <Card.Body>
          <h6 class="text-danger">{errorMessage}</h6>
          <InputGroup style={styles.input} className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="example@email.com"
              aria-describedby="basic-addon1"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Must have at least 6 characters"
              aria-describedby="basic-addon1"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputGroup>
          <div style={styles.forgot}>
            <Link to="/passwordLogin">Forgot Password?</Link>
          </div>

          <Button style={styles.button} onClick={signIn}>
            Sign In
          </Button>
          <Card.Text style={styles.notRegistered}>
            Not registered? <Link to="/signup">Sign Up!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  title: {
    paddingBottom: "2rem",
    paddingTop: "3rem",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "40rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    paddingBottom: "10px",
  },
  forgot: {
    paddingBottom: "15px",
  },
  notRegistered: {
    paddingTop: "0.7rem",
  },
  button: {
    marginBottom: "2px",
  },
};
