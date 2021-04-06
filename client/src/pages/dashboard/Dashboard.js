import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import { Link } from "react-router-dom";
import axios from 'axios';

const proposals = [
  {
      title: "Mapping for Environmental Justice",
      description: `Mapping for Environmental Justice (MEJ) is an
      initiative to create interactive and publicly-accessible maps displaying
      environmental justice data for individual states. With guidance from the
      residents of impacted communities, MEJ combines environment, public health,
      and demographic data into an indicator of vulnerability for communities in
      every state.`,
      voted: yesIcon
  },

  {
      title: "Give All Students Free Food",
      description: "We want to give every student at UC Berkeley free food.",
      voted: noIcon
  },

  {
    title: "Saving dogs",
    description: "Top dog saves dogs!"
  },
  
  {
    title: "Paint the Campanile Big Again",
    description: "fdsfdsafas",
    voted: yesIcon
  },

  {
    title: "Recycling Project 1",
    description: "Increase recycling by 500%",
    voted: noIcon
  },
  
  {
    title: "Recycling Project 2",
    description: "Increase recycling by 200%",
    voted: noIcon
  },
  
  {
    title: "Recycling Project 3",
    description: "Increase recycling by 300%",
    voted: noIcon
  },

  {
    title: "Make Big C Bigger!",
    description: "MAKE BIG C BIG AGAIN!"
  },

  {
    title: "Plant 1,000,000 Trees",
    description: "fdsfdsafas",
    voted: yesIcon
  },

  {
    title: "Trees for the Lorax",
    description: "Listen to the trees",
    voted: noIcon
  },

  {
    title: "We need help building XYZA",
    description: "fdsfdsafas",
    voted: yesIcon
  },

  {
    title: "some title4",
    description: "fdsfdsafas",
    voted: noIcon
  },

  {
    title: "some title5",
    description: "fdsfdsafas"
  },

  {
    title: "hiya!",
    description: "fdsfdsafas"
  },

  {
    title: "ebic",
    description: "fdsfdsafas"
  }
]

function Dashboard() {
  /* Contains all proposals. */
  const proposalHTML = []
  for (let i = 0; i < proposals.length; i++) {
    proposalHTML.push(<Row changeTitle={(x) => {setProposalTitle(x)}} 
                          changeDescription={(x) => {setProposalDescription(x)}}
                          title={proposals[i].title} 
                          description={proposals[i].description}
                          vote={proposals[i].voted ? proposals[i].voted : ""}/>);
  }

  /* Create states for SearchBar. */
  const [input, setInput] = useState("");
  const [proposalListDefault, setProposalListDefault] = useState(proposals);
  const [proposalList, setProposalList] = useState(proposalHTML);

  const [proposalTitle, setProposalTitle] = useState("Project Title");
  const [proposalDescription, setProposalDescription] = useState("Lorem Ipsum fdsafdasfdasfas");

  /* Updates proposalList state based on SearchBar input. */
  const updateInput = (input) => {
    let filteredList = [];
    for (let i = 0; i < proposals.length; i++) {
      if (proposalListDefault[i].title.toLowerCase().includes(input.toLowerCase())) {
        filteredList.push(<Row changeTitle={(x) => {setProposalTitle(x)}}
                                changeDescription={(x) => {setProposalDescription(x)}}
                                title={proposalListDefault[i].title} 
                                vote={proposalListDefault[i].voted ? proposalListDefault[i].voted : ""} />)
      }
      setInput(input);
      setProposalList(filteredList);
    } 
  }

  const[value, setValue] = React.useState('');

  const handleSubmit = async () => {
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8000/post_comment',
        data: {
          user_id: 1,
          proposal_id: 1,
          comment_text: value
        }
      });
    } catch(error) {
      console.log(error);
    }
    setValue('');
  };
  

  return (
    <div className="dashboard">
      <div className="dashboard-screen">
        <div className="left-proposals">
          <SearchBar keyword={input} setKeyword={updateInput}/>
          <div className="proposal-list">
            {proposalList}
          </div>
          <div className="shadows" aria-hidden="true"></div>
        </div>
        <div className="right-proposals">
          <div className="proposal-description">
            <div className="proposal-head-title">{proposalTitle}</div>
            <div className="proposal-head-description">{proposalDescription}</div>
            <div className="dividing-line"></div>
            <div className="comment-area">
              <textarea value={value} onChange={(event) => {setValue(event.target.value)}} id="textbox" name="textbox" className="comment-box" placeholder="Please enter text here!" rows="7" cols="53"></textarea>
              <div className="discussion-buttons">
              <button className="post-comment" onClick={handleSubmit}>Post Comment</button>
              <Link to="/proposal-details">
                  <button className="view-discussion" type="submit">View Discussion</button>
              </Link>
            </div>
            </div>
            <div className="voting-buttons">
                <button className="vote-yes">Vote Yes</button>
                <button className="vote-no">Vote No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
