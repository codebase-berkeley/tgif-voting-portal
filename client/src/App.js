import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/login/Login';
import LoginFail from './pages/login/LoginFail';
import Dashboard from './pages/dashboard/Dashboard';
import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import Members from './pages/members/Members.js';
import NavBar from './components/navbar/NavBar.js';
import ProposalManagement from './pages/proposalManagement/ProposalManagement.js';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  async function checkAuthenticationStatus() {
    const response = await axios.get('http://localhost:8000/isauth', {withCredentials: true});
    let authStatus = response.data;
    if (!authStatus) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
    setDoneLoading(true);
  }

  useEffect(() => {
    checkAuthenticationStatus();
    getProfile();
  }, []);

  const [userID, setUserID] = useState(0);
  const [privileges, setPrivileges] = useState('Non-Voting Member');

  async function getProfile() {
    const response = await axios.get('http://localhost:8000/getProfile', {withCredentials: true});

    setUserID(response.data.id);
    setPrivileges(response.data.privileges);
  }

  return (
    <Router>
      <div className="App">
          {doneLoading && <Switch>
            <Route exact path="/">
                <Login/>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              {isAuth ? <> <NavBar privileges={privileges}/> <Dashboard privileges={privileges}/> </> : <Redirect to="/login"/>}
            </Route>
            <Route path="/proposal-details/:id" children={isAuth ? <> <NavBar privileges={privileges}/> <ProposalDetails privileges={privileges} userID={userID}/> </> : <Redirect to="/login"/>}/>
            <Route path="/members">
              {isAuth ? <> <NavBar privileges={privileges}/> <Members privileges={privileges}/> </> : <Redirect to="/login"/>}
            </Route>
            <Route path="/proposal-management">
              {isAuth ? <> <NavBar privileges={privileges}/> <ProposalManagement privileges={privileges}/> </> : <Redirect to="/login"/>}
            </Route>
            <Route path="/proposal-details/:PROPOSAL_ID" children={isAuth ? <> <NavBar privileges={privileges}/> <ProposalDetails privileges={privileges}/> </> : <Redirect to="/login"/>}/>
            <Route path="/login-fail">
              <LoginFail/>
            </Route>
          </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
