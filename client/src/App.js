import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import ProposalManagement from './pages/proposalManagement/ProposalManagement.js';
// import ProposalTempManagement from './pages/proposalManagement/proposalPageTemp.js';
import NavBar from './components/navbar/NavBar.js'
;
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
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/proposal-details">
            <ProposalDetails />
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
