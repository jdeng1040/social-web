import React, { useState } from "react";
import { db } from "../../firebase";
import { Button } from "react-bootstrap";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { Avatar } from "@material-ui/core";

function PostBox({ firstName, lastName, picture, username }) {
  const [postMessage, setPostMessage] = useState("");
  const [postImage, setPostImage] = useState("");
  
  var d = new Date();
  const makePost = (e) => {
    e.preventDefault();
    var id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    db.collection("posts")
      .doc(id)
      .set({
        username: username,
        displayName: firstName + " " + lastName,
        avatar: picture,
        verified: true,
        text: postMessage,
        image: postImage,
        time: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
        order: Date.now(),
        id: id,
        likes: 0,
      });
    db.collection("posts").orderBy("order", "desc");
    setPostImage("");
  };
  return (
    <div>
      <Form style={styles.container}>
        <div style={styles.name}>
          <Avatar src={picture} />
          {firstName + " " + lastName}

          <div style={{ marginLeft: 5, color: "gray" }}>@{username}</div>
        </div>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="How are you staying active?"
            as="textarea"
            rows={3}
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            type="text"
          />
        </InputGroup>
        <Button onClick={makePost} type="submit">
          Make Post
        </Button>
      </Form>
    </div>
  );
}
const styles = {
  container: {
    borderColor: "rgb(199, 198, 198)",
    borderWidth: "0.5px",
    borderStyle: "solid",
    backgroundColor: "#f3f3f3",
    marginBottom: "0.5rem",
  },
  name: {
    display: "flex",
  },
};
export default PostBox;
