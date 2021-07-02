import React, { useState } from "react";
import { db } from "../../firebase";
import { Button } from "react-bootstrap";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { Avatar } from "@material-ui/core";

function PostBox({ firstName, lastName, picture }) {
  const [postMessage, setPostMessage] = useState("");
  const [postImage, setPostImage] = useState("");
  const [currentDateTime,setDateTime] = useState("")
  const[orderTime, setOrderTime] = useState("")
  var d = new Date()
  const makePost = (e) => {
    e.preventDefault();
    setDateTime((d.getDate()) + "/" + (d.getMonth()+1) + "/" + d.getFullYear())
    setOrderTime(Date.now())
    db.collection("posts")
    .add(
      {
      username: firstName,
      displayName: firstName + " " + lastName,
      avatar: picture,
      verified: true,
      text: postMessage,
      image: postImage,
      time: currentDateTime,
      order: orderTime
    }
    )
    db.collection("posts").orderBy("order","desc");
    setPostImage("");
  };

  return (
    <div>
      <Form style={styles.container}>
        <div style={styles.name}>
          <Avatar src={picture} />
          {firstName + " " + lastName}
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
