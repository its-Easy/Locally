import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/store/:storeID">
            <Store />
          </Route>
        </Switch>
      </Router>
    </>
  )
};

export default App;
