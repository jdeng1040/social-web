import React, { useState } from "react";
import { auth, db } from "../firebase";
import Sidebar from "./Sidebar"
import Feed from "./Feed"
import { Button } from "react-bootstrap";
export default function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userEmail = auth.currentUser?.email;
  // Create a reference to the users collection
  const userRef = db.collection("userInfo");

  // Create a query against the collection.
  if (userEmail) {
    const query = userRef.where("eMail", "==", userEmail);
    query
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setFirstName(doc.data().fName);
            setLastName(doc.data().lName); 
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }
  const fn = firstName
  const ln = lastName
  return (
    <div className="app">
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
      <Sidebar/>
      <Feed 
        firstNamePre={fn}
        lastNamePre={ln}
      />
    </div>
  );
}
