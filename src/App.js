import React from "react";
import './App.css';
import Sidebar from './Sidebar.js';
import Homepage from './Homepage.js';
import Chat from './Chat.js';
import Login from "./Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  // eslint-disable-next-line
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ): (
      <div className="app__body">
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
              <Sidebar/>
              <Chat/>
            </Route>
            <Route path="/">
              <Sidebar/>
              <Homepage/>
            </Route>
          </Switch>
        </Router>
      </div>)}
    </div>
  );
}

export default App;
