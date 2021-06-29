import Home from "../src/components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import EditProfile from "./components/EditProfile";
import FirebaseAuth from "./components/FirebaseAuth";
import Password from "./components/Password";
import Feed from "./components/Feed";

//cmd shift p

function App() {

  return (
    <div>
      <Router>
        <FirebaseAuth />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/password" component={Password} />
          <Route path="/feed" component={Feed} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
