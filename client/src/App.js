import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import Members from './pages/members/Members.js';
import NavBar from './components/navbar/NavBar.js';
import ProposalManagement from './pages/proposalManagement/ProposalManagement.js';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/proposal-details">
            <ProposalDetails />
          </Route>
          <Route path="/members">
            <Members />
          </Route>
          <Route path="/proposal-management">
            <ProposalManagement />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
