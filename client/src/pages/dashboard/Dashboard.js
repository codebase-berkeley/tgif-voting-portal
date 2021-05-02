import React from 'react';
import { useState, useEffect } from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import SearchBar from '../../components/searchbar/SearchBar';
import ProposalButton from '../proposalDetails/ProposalButton.js';
import { Link } from "react-router-dom";
import axios from 'axios';

var PRIVILEGES ='Voting Member';

function Dashboard() {

  const [proposals, setProposals] = useState([]);

  const [filteredProposalsList, setFilteredProposalsList] = useState([]);

  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/get_proposals_and_user_votes');
    //TODO change this endpoint to be a new endpoint that joins proposals with votes (filtered to just the users votes)
    let proposal_lst = response.data;
    /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
    while in deleting mode */
    console.log("proposals fetched " + proposal_lst)
    proposal_lst.forEach(proposal => {
      proposal_lst.checked = false;
    })
		setProposals(proposal_lst);
    setFilteredProposalsList(proposal_lst);
    firstProposal(proposal_lst);
  }

  useEffect(() => {
    fetchProposals();
  }, []);

  /* Create states for SearchBar. */
  const [input, setInput] = useState("");
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [wantedPropID, setWantedPropID] = useState(1);

   function firstProposal(proposal_lst) {
    try {
      const title = proposal_lst[0].title;
      const description = proposal_lst[0].description_text;
      setProposalTitle(title);
      setProposalDescription(description); 
    }
    catch (error) {
      console.log(error);
    }
  }

  /* Updates proposalList state based on SearchBar input. */
  const updateInput = (input) => {
    let filteredList = [];
    for (let i = 0; i < proposals.length; i++) {
      if (proposals[i].title.toLowerCase().includes(input.toLowerCase())) {
        filteredList.push(proposals[i]);
      }
      setInput(input);
      setFilteredProposalsList(filteredList);
    } 
  }

  const[textboxValue, setTextboxValue] = React.useState('');

  const handleSubmit = async () => {
    if (textboxValue !== '') {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8000/post_comment',
          data: {
            user_id: 1,
            proposal_id: wantedPropID,
            comment_text: textboxValue
          }
        });
      } catch(error) {
          console.log(error);
      }
      setTextboxValue('');
    }
  };

  const submitVote = async (voteDecision) => {
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8000/submitVote',
        data: {
          vote: voteDecision,
          user_id: 1,
          proposal_id: wantedPropID
        }
      }, );
    } catch(error) {
      console.log("There was an error in submitting your vote in dashboard.");
      console.log(error.stack);
    }
  };

  /* VOTING BUTTON STATES */
  const dashboardPressedYesButtonClassName = 'dashboardPressedYesButton votingMemberVotingButton';
  const dashboardUnpressedYesButtonClassName = 'dashboardUnpressedYesButton votingMemberVotingButton';
  const [dashboardYesButtonClassName, setDashboardYesButtonClassName] = useState(dashboardUnpressedYesButtonClassName);

  const dashboardPressedNoButtonClassName = 'dashboardPressedNoButton votingMemberVotingButton';
  const dashboardUnpressedNoButtonClassName = 'dashboardUnpressedNoButton votingMemberVotingButton';
  const [dashboardNoButtonClassName, setDashboardNoButtonClassName] = useState(dashboardUnpressedNoButtonClassName);

  function changeToYesButton() {
    setDashboardYesButtonClassName(dashboardPressedYesButtonClassName);
    setDashboardNoButtonClassName(dashboardUnpressedNoButtonClassName);
  }

  function changeToNoButton() {
    setDashboardYesButtonClassName(dashboardUnpressedYesButtonClassName);
    setDashboardNoButtonClassName(dashboardPressedNoButtonClassName);
  }

  async function fetchUserVote() {
    //TODO: replace user_id in params of axios request w/ actual deserialized id from cookie (instead of hardcoded 1)
    try {
      const res = await axios.get('http://localhost:8000/get_one_vote', {params : {user_id: 1, proposal_id: wantedPropID}});
      const vote = (res.data[0].vote);
      if (vote === true) {
        changeToYesButton();
      } else if (vote === false) {
        changeToNoButton();
      } else {
        setDashboardYesButtonClassName(dashboardUnpressedYesButtonClassName);
        setDashboardNoButtonClassName(dashboardUnpressedNoButtonClassName);
      }
    } catch (error) {
      console.log("Error in fetching a user's vote.");
      console.log(error.stack);
    } 
  }
  
  useEffect(() => {
    fetchUserVote();
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-screen">
        <div className="left-proposals">
          <SearchBar keyword={input} setKeyword={updateInput}/>
          <div className="proposal-list">
            {filteredProposalsList.map((proposal) => (
                        <Row changeTitle={(x) => {setProposalTitle(x)}}
                        changeDescription={(x) => {setProposalDescription(x)}}
                        changeWantedPropID={(x) => {setWantedPropID(x)}}
                        changeTextBoxValue={() => {setTextboxValue("")}}
                        title={proposal.title} 
                        description={proposal.description_text}
                        vote={proposal.voted ? proposal.voted : ""} 
                        id={proposal.id}
                        voteStatus={proposal.vote}
                        />
                    ))}
          </div>
          <div className="shadows" aria-hidden="true"></div>
        </div>
        <div className="right-proposals">
          <div className="proposal-description">
            <div className="proposal-head-title">{proposalTitle}</div>
            <div className="proposal-head-description">
              {proposalDescription}
            </div>
            <div className="dividing-line"></div>
            <div className={PRIVILEGES === 'Voting Member' ? "comment-area" : "comment-area nonvoting-comment-area"}>
              <textarea className="comment-box" value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} id="textbox" name="textbox" placeholder="Leave a comment" rows="7" cols="53"></textarea>
              <div className="discussion-buttons">
              <button className="post-comment" onClick={handleSubmit}>Post Comment</button>
              <Link to={`/proposal-details/${wantedPropID}`}>
                  <button className="view-discussion" type="submit">View Discussion</button>
              </Link>
            </div>
            </div>
            {(PRIVILEGES === 'Voting Member')
              ? <div className="dashboardVotingButtonsContainer">
                  <div className='leftDashboardButtonContainer dashboardButtonContainer'>
                    <ProposalButton buttonText='Vote Yes' buttonClassName={dashboardYesButtonClassName}
                      onClickFunc={() => {submitVote(true)
                                          setDashboardYesButtonClassName(dashboardPressedYesButtonClassName);
                                          setDashboardNoButtonClassName(dashboardUnpressedNoButtonClassName);}}
                    />
                  </div>

                  <div className='rightDashboardButtonContainer dashboardButtonContainer'>
                    <ProposalButton buttonText='Vote No' buttonClassName={dashboardNoButtonClassName}
                      onClickFunc={() => {submitVote(false)
                                          setDashboardYesButtonClassName(dashboardUnpressedYesButtonClassName);
                                          setDashboardNoButtonClassName(dashboardPressedNoButtonClassName);}}
                    />
                  </div>
                </div>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
