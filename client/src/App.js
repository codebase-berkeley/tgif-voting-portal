import ProposalDetails from './pages/proposalDetails/ProposalDetails.js';
import Dashboard from './pages/dashboard/Dashboard';
import NavBar from './components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Dashboard />
    </div>
  );
}

export default App;
