import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { useHistory } from "react-router-dom";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

export default function EditProfile() {
  // Create a reference to the users collection
  const userRef = db.collection("userInfo");
  const userId = auth.currentUser?.uid;
  const userEmail = auth.currentUser?.email;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bio, setBio] = useState("");
  const [bioEdit, setBioEdit] = useState("");
  const [picture, setPicture] = useState(null);
  const [url, setUrl] = useState("");
  const history = useHistory();

  useEffect(() => {
    userRef
      .doc(userId)
      .get()
      .then((doc) => {
        setFirstName(doc.data().fName);
        setLastName(doc.data().lName);
        setBio(doc.data().bio);
        setEmail(userEmail);
        setFirst(doc.data().fName);
        setLast(doc.data().lName);
        setBioEdit(doc.data().bio);
      })
      .catch((error) => {
        console.log(userId);
        console.log("Error getting documents: ", error);
      });
  }, []);

  const types = ["image/png", "image/jpeg"];

  const editPicture = (e) => {
    let picture = e.target.files[0];

    if (picture && types.includes(picture.type)) {
      setPicture(picture);
      setErrorMessage("");
    } else if (!picture) {
      setErrorMessage("");
    } else {
      setPicture(null);
      setErrorMessage("Please select an image file (jpeg or png)");
    }
  };

  const changeProfile = async () => {
    if (picture !== null) {
      const storageRef = storage.ref(picture.name);
      storageRef.put(picture);

      const url = await storageRef.getDownloadURL();
      setUrl(url);
      userRef
        .doc(userId)
        .update({
          pictureUrl: url,
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          setErrorMessage("Error updating document: ", error);
        });
    }
    if (firstName !== first) {
      
      userRef
        .doc(userId)
        .update({
          fName: firstName,
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          setErrorMessage("Error updating document: ", error);
        });
    }
    if (lastName !== last) {
      userRef
        .doc(userId)
        .update({
          lName: lastName,
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          setErrorMessage("Error updating document: ", error);
        });
    }
    if (email !== userEmail) {
      userRef
        .doc(userId)
        .update({
          eMail: email,
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          setErrorMessage("Error updating document: ", error);
        });
    }
    if (bio !== bioEdit) {
      userRef
        .doc(userId)
        .update({
          bio: bio,
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          setErrorMessage("Error updating document: ", error);
        });
    }
    history.push("/home");
  };

  return (
    <div style={{ padding: "15px" }}>
      <Form>
        <h2>Edit Profile</h2>
        <h6 class="text-danger">{errorMessage}</h6>
        <InputGroup className="mb-3">
          <InputGroup.Text>First Name</InputGroup.Text>
          <FormControl
            id="inlineFormInputGroup"
            placeholder="Enter your new First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Last Name</InputGroup.Text>
          <FormControl
            id="inlineFormInputGroup"
            placeholder="Enter your new Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Enter your new email"
            aria-describedby="basic-addon1"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Bio</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Change Profile Picture</Form.Label>
          <Form.Control type="file" onChange={editPicture} />
        </Form.Group>

        <div style={{ paddingBottom: "10px" }}>
          <Button onClick={changeProfile}>Save Changes</Button>
        </div>
        <Button
          variant="success"
          onClick={() => {
            history.push("/home");
          }}
        >
          Return to Profile
        </Button>
      </Form>
    </div>
  );
}
