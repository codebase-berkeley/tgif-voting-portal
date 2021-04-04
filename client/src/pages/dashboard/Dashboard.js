import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import { Link } from "react-router-dom";
import axios from "axios";

const proposals = [
  {
      title: "some title1",
      description: "fdsfdsafas",
      voted: yesIcon
  },

  {
      title: "Please give us money. Thanks",
      description: "fdsfdsafas",
      voted: noIcon
  },

  {
    title: "aljewnoinxansxlwnlndwondwasdn",
    description: "fdsfdsafas"
  },
  
  {
    title: "We need help building XYZB",
    description: "fdsfdsafas",
    voted: yesIcon
  },

  {
    title: "some title2",
    description: "fdsfdsafas",
    voted: noIcon
  },

  {
    title: "some title3",
    description: "fdsfdsafas"
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

  function postComment() {
    axios({
      method: 'post',
      url: '/post_comment',
      data: {
        comment_text: textbox.input
      }
    });
  }
  

  return (
    <div className="dashboard">
      <div className="dashboard-screen">
        <div className="left-proposals">
          <SearchBar keyword={input} setKeyword={updateInput}/>
          <div className="proposal-list">
            {proposalList}
          </div>
          <div class="shadows" aria-hidden="true"></div>
        </div>
        <div className="right-proposals">
          <div className="proposal-description">
              <div className="proposal-head-title">{proposalTitle}</div>
              <div className="proposal-head-description">{proposalDescription}</div>
              <div className="dividing-line"> </div>
              <div className="comment-area">
                <textarea id="textbox" className="comment-box" placeholder="Please enter text here!" rows="7" cols="53"></textarea>
                <div className="discussion-buttons">
                  <button className="post-comment" onClick={postComment}>Post Comment</button>
                  <Link to="/proposal-details">
                    <button className="view-discussion">View Discussion</button>
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
