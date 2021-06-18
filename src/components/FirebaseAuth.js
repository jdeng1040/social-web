import {useState, useEffect} from "react";
import { auth } from "../firebase";
import {
    useHistory,
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
        console.log("User is logged in");
        setUser(user);
        history.push("/home");
      } else {
        console.log("User is logged out");
        setUser(null);
        history.push("/signin");
      }
    });
  }, []);
  return null;
}
