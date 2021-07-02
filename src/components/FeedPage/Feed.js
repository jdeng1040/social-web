import React, { useEffect, useState } from "react";
import Post from "./Post";
import PostBox from "./PostBox";
import { db, auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import NavigationBar from "../NavBar";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [url, setUrl] = useState(null);

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
    db.collection("posts")
    .orderBy('order',"desc")
    .onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    })
  }
    
  , []);

  return (
    <div style={styles.container}>
      <NavigationBar />
      <PostBox firstName={firstName} lastName={lastName} picture={url} />
      {posts.map((post) => (
        <div styles={styles.post}>
          <Post
            displayName={post.displayName}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            dateTime={post.time}
          />
        </div>
      ))}
    </div>
  );
}
const styles = {
  container: {
    paddingRight: "10rem",
    paddingLeft: "10rem",
    //paddingTop: "1rem",
    flex: "0.4",
    overflowY: "scroll",
  },
  post: {
    marginTop: "0.5rem",
  },
};

export default Feed;
