import logo from './logo.svg';
import './App.css';

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
    <h1>Auth2</h1>
  );
}

export default App;
