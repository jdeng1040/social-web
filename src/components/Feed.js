import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
import PostBox from "./PostBox";
import { db, auth } from "../firebase";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        setUrl(doc.data().pictureUrl);
      })
      .catch((error) => {
        console.log(userId);
        console.log("Error getting documents: ", error);
      });
  }
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2> Feed Page </h2>
        <Button
          variant="success"
          onClick={() => {
            history.push("/home");
          }}
        >
          Go back home
        </Button>
      </div>
      <PostBox firstName={firstName} lastName={lastName} picUrl={url}/>
      {posts.map((post) => (
        <Post
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default Feed;
