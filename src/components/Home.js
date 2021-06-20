import React, { useState } from "react";
import { auth, db } from "../firebase";
import Sidebar from "./Sidebar"

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
  
  return (
    <div>
      <h1>Homepage</h1>
        <h3>Welcome {firstName} {lastName}</h3>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
      <Sidebar />
    </div>
  );
}
