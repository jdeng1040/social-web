import React, {useEffect, useState} from "react"
import { db } from "../../firebase";
import {
    FavoriteBorder
  } from "@material-ui/icons";
function LikeButton({likedUsers, currentUserUsername, id, likes}) {
    const [isVoting, setVoting] = useState(false);
    const [votedUsers, setVotedUsers] = useState([]);
    const [numLikes, setLikes] = useState(likes);
    useEffect(() => {
        const likedCollector = likedUsers;
        let prevLiked = [];
        
        try{
            prevLiked = likedCollector

        }catch(error){
            console.log(error)
        }
        setVotedUsers(prevLiked)
    }, [])
    function disableVoting(user){
        const prevLiked = votedUsers;
        prevLiked.push(user);
        setVotedUsers(prevLiked);
        db.collection("posts").doc(id).update({
            likedUsers: votedUsers
        })
    }
    function enableVoting(user){
        const prevLiked = votedUsers
        prevLiked.splice(prevLiked.indexOf(currentUserUsername),1)
        setVotedUsers(prevLiked)
        db.collection("posts").doc(id).update({
            likedUsers: votedUsers
        })
    }
    function click(){
        if(!checkIfLiked()){
            console.log("clicked" + numLikes)
            setLikes(numLikes + 1)
            db.collection("posts").doc(id).update({
                likes: numLikes + 1
            })
            console.log(numLikes)
        
            disableVoting(currentUserUsername)
        }
        else{
            setLikes(numLikes-1)
            db.collection("posts").doc(id).update({
                likes: numLikes - 1
            })
            enableVoting(currentUserUsername)
            console.log(numLikes)
            

        }
    }
    function checkIfLiked(){
        if(votedUsers.indexOf(currentUserUsername) > -1){
            console.log("true")
            return true

        }
        else{
            console.log("false")
            return false
        }
    };
    
    return (
        <button  onClick={click} />
    )
}
export default LikeButton