import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream
=======
import React, {useEffect, useState} from 'react'
import Home from './components/Home'
import Signin from './components/Signin'
import { auth } from './firebase';
import Signup from './components/Signup';
>>>>>>> Stashed changes

function App() {
  //const history = useHistory()
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        //history.push("/home")
        console.log("yep");
        // setUser(user);
      } else {
        console.log("nope");
        // setUser(null);
      }
    });
  }, [])
  return (
<<<<<<< Updated upstream
    <h1>Auth2</h1>
=======
    <div>
      {/* <Switch>
      <Route route="/sign-up" component={Signup}/>
      <Route route="/sign-in" component={Signin}/>
      <Route route="/home" component={Home}/>
      </Switch> */}
    </div>
>>>>>>> Stashed changes
  );
}

export default App;
