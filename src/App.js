import Home from "./components/ProfilePage/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import EditProfile from "./components/ProfilePage/EditProfile";
import FirebaseAuth from "./components/FirebaseAuth";
import { Password, PasswordLogin } from "./components/Password";
import Feed from "./components/FeedPage/Feed";
import OtherProfile from "./components/ProfilePage/OtherProfile";

//cmd shift p

function App() {
  return (
    <div>
      <Router>
        <FirebaseAuth />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/feed" component={Feed} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/password" component={Password} />
          <Route path="/passwordLogin" component={PasswordLogin} />
          <Route path="/otherProfile" component={OtherProfile} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
