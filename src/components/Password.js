import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

//password
export default function Password() {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const changePassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setMessage("Password reset email sent!");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h1>Change your Password</h1>
      <Card
        style={{
          width: "40rem",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5rem",
        }}
      >
        <Card.Body>
          <Card.Title>Change your Password</Card.Title>
          <h6 class="text-danger">{errorMessage}</h6>
          <h6 class="text-success">{message}</h6>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Email</InputGroup.Text>
              <FormControl
                type="email"
                id="inlineFormInputGroup"
                placeholder="Enter email to reset password"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>
          </Form>
          <div>
            <Button
              variant="success"
              onClick={changePassword}
              style={{
                marginBottom: "0.5rem",
              }}
            >
              Reset password
            </Button>
          </div>
          <Button
            onClick={() => {
              history.push("/home");
            }}
          >
            Return to profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
