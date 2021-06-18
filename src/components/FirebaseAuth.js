import React, {useState, useEffect} from "react";
import { auth } from "../firebase";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
    Redirect,
  } from "react-router-dom";

export default function FirebaseAuth() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        console.log("yep");
        setUser(user);
        history.push("/home");
      } else {
        console.log("nope");
        setUser(null);
        history.push("/signin");
      }
    });
  }, []);
  return null;
}
