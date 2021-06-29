import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
import PostBox from "./PostBox"
import { db } from "../firebase";

function Feed( {firstNamePre, lastNamePre } ) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => doc.data()));
        });
      }, []);
    
      return (
        <div className="feed">
            <div className="feed__header">
                <h2> Home Page </h2>
            </div>
            <PostBox 
                firstName={firstNamePre}
                lastName={lastNamePre}
            />
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
        

    )
}

export default Feed
