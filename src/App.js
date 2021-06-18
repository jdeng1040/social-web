import "./App.css";
import Home from "../src/components/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import FirebaseAuth from "./components/FirebaseAuth";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
