import React, { useState } from "react";
import { auth, db } from "../firebase";
import Sidebar from "./Sidebar"
import Feed from "./Feed"
import { Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");

  const userEmail = auth.currentUser?.email;
  const userId = auth.currentUser?.uid;
  const history = useHistory();

  // Create a reference to the users collection
  const userRef = db.collection("userInfo");
  // Create a query against the collection.
  if (userEmail) {
    userRef
      .doc(userId)
      .get()
      .then((doc) => {
        setFirstName(doc.data().fName);
        setLastName(doc.data().lName);
        setBio(doc.data().bio);
        setUrl(doc.data().pictureUrl);
      })
      .catch((error) => {
        console.log(userId);
        console.log("Error getting documents: ", error);
      });
  }
  return (
    <div style={{ padding: "15px" }}>
      <h1>Profile Page</h1>
      <Image src={url} thumbnail />
      <h3>
        Welcome to FitNow {firstName} {lastName}!
      </h3>
      <p>{bio}</p>
      <div style={{ paddingBottom: "10px" }}>
        <Button
          onClick={() => {
            history.push("/editprofile");
          }}
        >
          Edit your profile
        </Button>
        <Button
          variant="success"
          onClick={() => {
            history.push("/password");
          }}
        >
          Change Password
        </Button>
      </div>
      <Button
        variant="danger"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </Button>
      <div>
      <Button
      variant="success"
        onClick={() => {
          history.push("/feed");
        }}
      >
        Go to feed
      </Button>
      </div>
      
      {/* <Sidebar/> */}
    </div>
  );
}
