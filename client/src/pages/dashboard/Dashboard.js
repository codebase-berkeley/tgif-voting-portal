import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar'


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
  // const [input, setInput] = React.useState("");
  // const [proposalListDefault, setProposalListDefault] = React.useState("");
  // const [proposalList, setProposalList] = React.useState("");

  // const updateInput = async (input) => {
  //   let filteredList = [];
  //   for (let i = 0; i < proposals.length; i++) {
  //     if (proposalListDefault[i].title.includes(input)) {
  //       filteredList.push(<Row title={proposals[i].title} vote={proposals[i].vote} />)
  //     }
  //     setInput(input);
  //     setProposalList(filteredList)
  //   }
  // }
  return (
    <div className="dashboard">
      <div className="navBar">this is the delicious navbar</div>
      <div className="dashboard-screen">
        <div className="proposal-list">
          {/* { <SearchBar input={input} onChange={updateInput}/> } */}
          {proposals.map((proposal) => (
            <Row
              title = {proposal.title}
              vote = {proposal.voted ? proposal.voted : ""}
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
