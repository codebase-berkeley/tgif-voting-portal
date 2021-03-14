import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';

const proposals = [
  {
      title: "some title",
      voted: yesIcon
  },

  {
      title: "Please give us money. Thanks",
      voted: noIcon
  },

  {
    title: "aljewnoinxansxlwnlndwondwdn"
  },
  
  {
    title: "We need help building XYZ",
    voted: yesIcon
  },

  {
    title: "some title",
    voted: noIcon
  },

  {
  title: "some title"
  },
  {
    title: "We need help building XYZ",
    voted: yesIcon
  },

  {
    title: "some title",
    voted: noIcon
  },

  {
  title: "some title"
  }
]



function Dashboard() {
  const proposalHTML = []
  for (let i = 0; i < proposals.length; i++) {
    proposalHTML.push(<Row title={proposals[i].title} vote={proposals[i].voted ? proposals[i].voted : ""} />);
  }

  const [input, setInput] = React.useState("");
  const [proposalListDefault, setProposalListDefault] = React.useState(proposals);
  const [proposalList, setProposalList] = React.useState(proposalHTML);

  const updateInput = (input) => {
    console.log("updated " + input)
    let filteredList = [];
    for (let i = 0; i < proposals.length; i++) {
      if (proposalListDefault[i].title.toLowerCase().includes(input.toLowerCase())) {
        filteredList.push(<Row title={proposalListDefault[i].title} vote={proposalListDefault[i].voted ? proposalListDefault[i].voted : ""} />)
      }
      setInput(input);
      setProposalList(filteredList);
    } 
  }
  return (
    <div className="dashboard">
      <div className="navBar">this is the delicious navbar</div>
      <div className="dashboard-screen">
        <div className="proposal-list">
          {<SearchBar keyword={input} setKeyword={updateInput}/>}
          {proposalList}
        </div>
        <div className="proposal-description"></div>
      </div>
    </div>
  );
}

export default Dashboard;
