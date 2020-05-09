import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Saved, Search } from "./Main";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Google Books App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">Search</Link>
              </li>
              <li className="nav-item ml-4">
                <Link to="/saved">Saved Books</Link>
              </li>

            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/saved">
            <Saved />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
