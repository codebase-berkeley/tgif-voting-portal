import {useState, useEffect} from 'react';
import Row from '../../components/row/Row';
import * as FeatherIcon from 'react-feather';
import './Dashboard.css';

const proposals = {
    proposal1: {
      title: "some title",
      voted: <FeatherIcon.Check color="#c9e5cb" size={40}/>
  },

  proposal2: {
      title: "some title",
      voted: <FeatherIcon.X color="#dd515f" size={40}/>
  },

  proposal3: {
    title: "some title"
  }
}

function Dashboard() {

  const [proposals, setProposals] = useState();

  function fetchData() {
    setProposals();
  }

  useEffect(() => {}
  );
  
  return (
    <div className="dashboard">
      <div className="navbar"></div>
      <div className="dashboard-screen">
        <div className="proposal-list">
          <div className="searchBar">
            
          </div>
          {proposals.map((proposal) => (
            <Row
              proposal-title={proposals[proposal].title}
              vote-status={proposals[proposal].voted ? proposals[proposal].voted    : null}
            >
            </Row>
          ))}
          </div>
        <div className="proposal-description"></div>
      </div>
    </div>
  );
}

export default Dashboard;
