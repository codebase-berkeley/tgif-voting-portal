import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/login/Login';
import LoginFail from './pages/login/LoginFail';
import Dashboard from './pages/dashboard/Dashboard';
import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import Members from './pages/members/Members.js';
import NavBar from './components/navbar/NavBar.js';
import ProposalManagement from './pages/proposalManagement/ProposalManagement.js';
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <NavBar/>
            <Dashboard />
          </Route>
          <Route path="/proposal-details/:id" children={<React.Fragment> <NavBar/> <ProposalDetails /> </React.Fragment>}></Route>
          <Route path="/members">
            <NavBar/>
            <Members />
          </Route>
          <Route path="/proposal-management">
            <NavBar/>
            <ProposalManagement />
          </Route>
          <Route path="/login-fail">
            <LoginFail/>
          </Route>
          <Route path="/proposal-details/:PROPOSAL_ID" children={<React.Fragment> <NavBar/> <ProposalDetails /> </React.Fragment>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
