import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";

import { Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavigationBar from "../NavBar";
import firebase from "firebase";

export default function OtherProfile() {
  const [follow, setFollow] = useState(false);
  const [following, setFollowing] = useState(false);

  const [numFollow, setNumFollow] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [url, setUrl] = useState("");

  const userEmail = auth.currentUser?.email;
  const userId = auth.currentUser?.uid;
  const history = useHistory();
  const username = history.location.pathname.split("/")[2];

  // Create a reference to the users collection
  const userRef = db.collection("userInfo");
  // Create a query against the collection.
  userRef
    .where("username", "==", username)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setFirstName(doc.data().fName);
        setLastName(doc.data().lName);
        setBio(doc.data().bio);
        setUrl(doc.data().pictureUrl);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  const handleFollowQuery = async () => {
    if (userId && username) {
      const results = await db
        .collection("following")
        .where("following", "==", userId)
        .where("followed", "==", username)
        .get();

      setFollowing(Boolean(results.size));
    }
  };

  //set following state variable
  useEffect(() => {
    handleFollowQuery();
    //set following and follow count on frontend
    db.collection("userInfo")
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNumFollowing(doc.data().numFollowing);
          setNumFollow(doc.data().numFollow);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [userId]);

  const onFollow = async () => {
    setFollowing(true);
    //firebase following
    await db
      .collection("following")
      .doc(userId)
      .set({ following: userId, followed: username });
    //increment your following value in firebase
    await db
      .collection("userInfo")
      .doc(userId)
      .update({
        numFollowing: firebase.firestore.FieldValue.increment(1),
      });
      

    //increment followers for other user count in firebase
    //and set the numfollow and numfollowing for the username
    const querySnapshot2 = await db
      .collection("userInfo")
      .where("username", "==", username)
      .get();

    querySnapshot2.forEach(async function (doc) {
      await doc.ref.update({
        numFollow: firebase.firestore.FieldValue.increment(1),
      });
      setNumFollow(numFollow + 1);
      console.log(doc.data().numFollow);
      // setNumFollowing(doc.data().numFollowing);
      // console.log(doc.data().numFollowing);
    });
  };

  const unFollow = async () => {
    console.log(numFollowing);

    setFollowing(false);
    //delete the following doc
    await db.collection("following").doc(userId).delete();
    //decrement following value in firebase
    await db
      .collection("userInfo")
      .doc(userId)
      .update({
        numFollowing: firebase.firestore.FieldValue.increment(-1),
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    //decrement followers for other user count in firebase
    //and set the numfollow and numfollowing for the username
    db.collection("userInfo")
      .where("username", "==", username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            numFollow: firebase.firestore.FieldValue.increment(-1),
          });
          setNumFollow(numFollow - 1);
          setNumFollowing(doc.data().numFollowing);
        });
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div style={styles.container}>
      <NavigationBar />
      <h1>Other Profile</h1>
      <Image src={url} thumbnail />
      <div>
        <h3>
          {firstName} {lastName}
        </h3>
        <h4>
          Followers: {numFollow} Following: {numFollowing}
        </h4>
        {following ? (
          <Button variant="success" onClick={unFollow}>
            Following
          </Button>
        ) : (
          <Button onClick={onFollow}>Follow</Button>
        )}
      </div>

      <p>{bio}</p>
    </div>
  );
}
const styles = {
  container: {
    paddingRight: "10rem",
    paddingLeft: "10rem",
  },
  buttonContainer: {
    paddingBottom: "10px",
  },
};
