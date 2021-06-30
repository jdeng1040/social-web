import React, { useState } from "react";
import { db } from "../firebase";
import { Button } from "react-bootstrap";

import "./PostBox.css";
//import Avatar from "@material-ui/core";

function PostBox({ firstName, lastName, picUrl }) {
  const [postMessage, setPostMessage] = useState("");
  const [postImage, setPostImage] = useState("");
  const makePost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      username: firstName,
      displayName: firstName + " " + lastName,
      avatar:
        picUrl,
      verified: true,
      text: postMessage,
      image: postImage,
    });
    setPostImage("");
    setPostImage("");
  };

  return (
    <div className="postBox">
      <form>
        <div className="postBox__input">
          {/* <Avatar /> */}
          <input
            value={postMessage}
            onChange={(e) => setPostMessage(e.target.value)}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        {/* <input 
                    placeholder="Optional: Enter image URL"
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    type="text"
                /> */}

        <Button onClick={makePost} type="submit">
          Make Post
        </Button>
        {/* <button onClick={makePost} type="submit" >
                    Make Post
                </button> */}
      </form>
    </div>
  );
}

export default PostBox;
