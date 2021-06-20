import React, { useState } from "react";
import { auth, db } from "../firebase";
import { Button } from "react-bootstrap";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const userEmail = auth.currentUser?.email;

  // Create a reference to the users collection
  const userRef = db.collection("userInfo");
  // Capitalise name
  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }
  // Create a query against the collection.
  if (userEmail) {
    const query = userRef.where("eMail", "==", userEmail);
    query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setFirstName(capitalize(doc.data().fName));
          setLastName(capitalize(doc.data().lName));
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <div>
      <h1>Homepage</h1>
      <h3>
        Welcome to FitNow {firstName} {lastName}!
      </h3>
      <Button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
