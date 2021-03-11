import {useState, useEffect} from 'react';
import Row from '../../components/row/Row';
import * as FeatherIcon from 'react-feather';
import './Dashboard.css';

const iconSize = 40;

const proposals = [
  {
      title: "some title",
      voted: <FeatherIcon.Check color="green" size={iconSize}/>
  },

  {
      title: "Please give us money. Thanks",
      voted: <FeatherIcon.X color="red" size={iconSize}/>
  },

  {
    title: "aljewnoinxansxlwnlndwondwdn"
  },
  
  {
    title: "We need help building XYZ",
    voted: <FeatherIcon.Check color="green" size={iconSize}/>
  },

  {
    title: "some title",
    voted: <FeatherIcon.X color="red" size={iconSize}/>
  },

  {
  title: "some title"
  }
]

let proposal_titles = ["Proposal #1", "Proposal #2", "Proposal #3", "Proposal #4", "Proposal #1"]

// const updateInput = async (input) => {
  //Get list of components and filter, returning the HTML
  // of the rows that pass
  // (Maybe if it contains the words typed)
// }

function Dashboard() {
  // const [input, setInput] = useState("");
  
  return (
    <div className="dashboard">
      <div className="navBar">this is the delicious navbar</div>
      <div className="dashboard-screen">
        <div className="proposal-list">
          {/* <SearchBar input={input} onChange={updateInput}/> */}
          {proposals.map((proposal) => (
            <Row
              title = {proposal.title}
              vote = {proposal.voted ? proposal.voted : null}
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
