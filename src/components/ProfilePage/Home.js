import React, { useState } from "react";
import { auth, db } from "../../firebase";

import { Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavigationBar from "../NavBar";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");
  const [numFollow, setFollow] = useState("");
  const [numFollowing, setFollowing] = useState("");
  
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
        setFollow(doc.data().numFollow);
        setFollowing(doc.data().numFollowing);
      })
      .catch((error) => {
        console.log(userId);
        console.log("Error getting documents: ", error);
      });
  }
  return (
    <div style={styles.container}>
      <NavigationBar />
      <h1>Profile Page</h1>
      <Image src={url} thumbnail />
      <h3>
        {firstName} {lastName}
      </h3>
      <h4>
        Followers: {numFollow} Following: {numFollowing}
      </h4>
      <p>{bio}</p>
      <div style={styles.buttonContainer}>
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
    </div>
  );
}
const styles = {
  container: {
    paddingRight: "10rem",
    paddingLeft: "10rem",
  },
  buttonContainer: {
    paddingBottom: "10px"
  },
};
