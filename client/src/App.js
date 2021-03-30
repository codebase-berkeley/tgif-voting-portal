import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <ProposalDetails/>
    // </div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/proposal-details">Proposal Details</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/proposal-details">
            <ProposalDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
