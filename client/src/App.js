import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import ProposalManagement from './pages/proposalManagement/ProposalManagement.js';
// import ProposalTempManagement from './pages/proposalManagement/proposalPageTemp.js';
import NavBar from './components/navbar/NavBar.js'
import {React, useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from'axios';



function App() {
  // const [proposals, setProposals] = useState([]);

  // async function fetchProposals() {
  //   const response = await axios.get('http://localhost:8000/getProposals');
  //   console.log(response);
  //   let proposal_lst = response.data;
  //   setProposals(proposal_lst);
  // }
  
  // useEffect(() => {
  //   fetchProposals();
  // }, [])

  return (
    <Router>
      <div className="App">
        <NavBar/>

        {/* {proposals.map((proposal) => (
        <li>
          <Link to={proposal.id.toString()}></Link>
        </li> 
        ))} */}
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
          <Route path="/proposal-details/:id" children={<ProposalDetails />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
