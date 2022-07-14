import Home from "./pages/Home";
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
        </Switch>
      </Router>
    </>
  )
};

export default App;