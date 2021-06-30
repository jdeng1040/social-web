import React from "react";
import { auth, db } from "../../firebase";

import { Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavigationBar from "../NavBar";

export default function OtherProfile() {
  const [follow, setFollow] = useState(false);
  const [following, setFollowing] = useState(false);
  return (
    <div>
      <NavigationBar />
    </div>
  );
}
