import { Avatar } from "@material-ui/core";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  VerifiedUser,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Post({
  displayName,
  verified,
  text,
  image,
  avatar,
  username,
  currentUserUsername,
  dateTime,
  id,
  likes
}) {
  const [likesreal, setLikes] = useState(0);
  
  function deletePost(){
    db.collection("posts").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
  function likePost(){
    setLikes(likes + 1)
    db.collection("posts").doc(id).update({
      likes: likesreal
    })
  }
  return (
    <div>
      <Card style={styles.container}>
        <Card.Body>
          <Card.Title style={styles.title}>
            <Avatar src={avatar} style={styles.titleAvatar} />
            {displayName}
            <Link
              to={
                username === currentUserUsername
                  ? "/home"
                  : `/otherProfile/${username}`
              }
              style={{ marginLeft: 5, color: "gray", textDecoration: "none" }}
            >
              @{username}
            </Link>
            {verified && <VerifiedUser style={styles.verifiedIcon} />}
          </Card.Title>
          <Card.Img variant="top" src={image} alt="" />
          <Card.Text>{text}</Card.Text>
          <div>
            <ChatBubbleOutline fontSize="small"/>
            <FavoriteBorder fontSize="small" onClick={likePost}/>
            <HighlightOffIcon fontSize="small" onClick={deletePost}/>
            {dateTime}
            Likes: {likes}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
const styles = {
  container: {
    borderColor: "rgb(199, 198, 198)",
    borderWidth: "0.5px",
    borderStyle: "solid",
    backgroundColor: "#f3f3f3",
  },
  title: {
    display: "flex",
  },
  titleAvatar: {
    marginRight: "0.75rem",
  },
  verifiedIcon: {
    fontSize: "15px !important",
    color: "blue",
    marginLeft: "0.5rem",
  },
  postAvatar: {
    paddingTop: "0.75rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
  },
};

export default Post;
