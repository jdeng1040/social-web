import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { Button, Card, InputGroup, FormControl } from "react-bootstrap";

export default function Signup() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errorMessage, setMessage] = useState("");

  //database stuff
  let personalInfo = {
    fName: firstName,
    lName: lastName,
    eMail: email,
    bio: "",
    pictureUrl: "",
  };
  const signUp = (e) => {
    e.preventDefault();
    if (firstName  === "" || lastName === "") {
      setMessage("Please enter your first and last name");
      console.log("error with first and last name");
    } 
    else if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
    } 
    else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          db.collection("userInfo")
            .doc(auth.currentUser?.uid)
            .set(personalInfo)
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          console.log(user);
        })
        .catch((err) => {
          setMessage(err.message);
          console.log(err);
        });
    }
  };
  return (
    <div>
      <h1
        style={{
          paddingBottom: "2rem",
          paddingTop: "3rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        SignUp on FitNow now!
      </h1>
      <Card style={{ width: "40rem", marginLeft: "auto", marginRight: "auto" }}>
        <Card.Body>
          <h6 class="text-danger">{errorMessage}</h6>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Password Confirmation</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Same as above"
              aria-describedby="basic-addon1"
              type="password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </InputGroup>
          <Button onClick={signUp}>Sign Up!</Button>
          <Card.Text
            style={{
              paddingTop: "0.7rem",
            }}
          >
            Already registered? <Link to="/signin">Sign In</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
