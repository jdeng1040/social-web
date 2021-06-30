import { Avatar } from "@material-ui/core";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Publish,
  Repeat,
  VerifiedUser,
} from "@material-ui/icons";
import React from "react";
import { Card } from "react-bootstrap";

function Post({ displayName, verified, text, image, avatar }) {
  return (
    <div>
      <Card style={styles.container}>
        <Card.Body>
          <Card.Title style={styles.title}>
            <Avatar src={avatar} style={styles.titleAvatar}/>
            {displayName}
            {verified && (
              <VerifiedUser
                style={styles.verifiedIcon}
              />
            )}
          </Card.Title>
          <Card.Img variant="top" src={image} alt="" />
          <Card.Text>{text}</Card.Text>
          <div>
            <ChatBubbleOutline fontSize="small" />
            <FavoriteBorder fontSize="small" />
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
    marginRight: "0.75rem"
  },
  verifiedIcon: {
    fontSize: "15px !important",
    color: "blue",
    marginLeft: "0.5rem"
  },
  postAvatar: {
    paddingTop: "0.75rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
  },
};

export default Post;
