import "./App.css"
import Error from "./pages/Error";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
function App() {
  return (
    <div className="App">
      <Home></Home>
      <Rooms></Rooms>
      <SingleRoom></SingleRoom>
      <Error></Error>
    </div>
  );
}

export default App;
