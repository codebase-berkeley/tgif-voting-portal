 import React from 'react';
import { useState, useEffect } from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import ProposalButton from '../proposalDetails/ProposalButton.js';
import { Link } from "react-router-dom";
import axios from 'axios';

function Dashboard(props) {

  const PRIVILEGES = props.privileges;
  const USER_ID = props.userID;
  
  const [proposals, setProposals] = useState([]);
  const [filteredProposalsList, setFilteredProposalsList] = useState([]);

  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/getProposals');
    let proposal_lst = response.data;
    /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
    while in deleting mode */
    proposal_lst.forEach(proposal => {
      proposal_lst.checked = false;
    })
		setProposals(proposal_lst);
    setFilteredProposalsList(proposal_lst);
  }

  useEffect(() => {
    fetchProposals();
  }, []);

  /* Create states for SearchBar. */
  const [input, setInput] = useState("");
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [wantedPropID, setWantedPropID] = useState(1);

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

  const[textboxValue, setTextboxValue] = useState('');

  const handleSubmit = async () => {
    if (textboxValue !== '') {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8000/post_comment',
          data: {
            user_id: USER_ID,
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
    console.log("Voted");
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8000/submitVote',
        data: {
          vote: voteDecision,
          user_id: USER_ID,
          proposal_id: wantedPropID
        }
      });
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

  return (
    PRIVILEGES !== null && 
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
                      onClickFunc={() => {setDashboardYesButtonClassName(dashboardPressedYesButtonClassName);
                                          setDashboardNoButtonClassName(dashboardUnpressedNoButtonClassName);
                                          submitVote(true);}}
                    />
                  </div>

                  <div className='rightDashboardButtonContainer dashboardButtonContainer'>
                    <ProposalButton buttonText='Vote No' buttonClassName={dashboardNoButtonClassName}
                      onClickFunc={() => {setDashboardYesButtonClassName(dashboardUnpressedYesButtonClassName);
                                          setDashboardNoButtonClassName(dashboardPressedNoButtonClassName);
                                          submitVote(false);}}
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
