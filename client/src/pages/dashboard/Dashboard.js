import React from 'react';
import { useState, useEffect } from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import SearchBar from '../../components/searchbar/SearchBar';
import ProposalButton from '../proposalDetails/ProposalButton.js';
import { Link } from "react-router-dom";
import axios from 'axios';

let PROPOSAL_ID;

function Dashboard(props) {
  
  const PRIVILEGES = props.privileges;
  const USER_ID = props.userID;
  
  const [proposals, setProposals] = useState([]);
  const [vote, setVote] = useState(null);
  const [filteredProposalsList, setFilteredProposalsList] = useState([]);
  const [needReRender, setNeedReRender] = useState(false);

    /* Create states for SearchBar. */
    const [input, setInput] = useState("");
    const [proposalTitle, setProposalTitle] = useState(null);
    const [proposalDescription, setProposalDescription] = useState("");
    const [wantedPropID, setWantedPropID] = useState(1);


  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/get_proposals_and_user_votes', {params : {user_id: USER_ID}});
    //TODO change this endpoint to be a new endpoint that joins proposals with votes (filtered to just the users votes)
    let proposal_lst = response.data;
    /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
    while in deleting mode */
    proposal_lst.forEach(proposal => {
      proposal_lst.checked = false;
    })
		setProposals(proposal_lst);
    setFilteredProposalsList(proposal_lst);
    if (proposalTitle === null) {
      firstProposal(proposal_lst);
    }
  }

  useEffect(() => {
    if (props.userID !== null && props.userID != 0) {
      fetchProposals();
    }

  }, [props.userID, needReRender]);

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

  async function submitVote(voteDecision) {
    try {
      await axios.post('http://localhost:8000/submitVote', {
        vote: voteDecision,
        user_id: USER_ID,
        proposal_id: wantedPropID
      });
      setVote(voteDecision);
      proposals.forEach(proposal => {
        if (proposal.id === wantedPropID) {
          proposal.vote = voteDecision;
        }
      })
      setNeedReRender(!needReRender);
      console.log(proposals);
    } catch(error) {
        console.log("There was an error in submitting your vote.");
        console.log(error.stack);
    }
  };

  /* REACT STATES FOR NONADMIN VOTING BUTTONS */
  const nonAdminPressedYesButtonClassName = 'pressedYesButton nonAdminButton';
  const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton nonAdminButton';
  const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);

  const nonAdminPressedNoButtonClassName = 'pressedNoButton nonAdminButton';
  const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton nonAdminButton';
  const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);

  async function setVoteButtons(clickedProposal) {
    try {
      let buttonStatus;
      for (let i = 0; i < proposals.length; i++) {
        if (proposals[i].id == clickedProposal) {
          buttonStatus = proposals[i].vote;
          break;
        }
      }

      if (buttonStatus == null) {
        setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
        setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
      } else if (buttonStatus) {
        setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
        setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName)
      } else {
        setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
        setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
      }
      setNeedReRender(!needReRender);
    } catch (error) {
      console.log("Error in fetching a user's vote.");
      console.log(error.stack);
    }
  }

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
                        changeVoteButton={(x) => {setVoteButtons(x)}}
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
                  <div className='leftButtonContainer buttonContainer'>
                    <ProposalButton buttonText='Vote Yes' buttonClassName={nonAdminYesButtonClassName}
                      onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                          setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
                                          submitVote(true, USER_ID)
                                          setVote('Yes');}}
                    />
                  </div>
                <div className='rightButtonContainer buttonContainer'>
                  <ProposalButton buttonText='Vote No' buttonClassName={nonAdminNoButtonClassName}
                    onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
                                        setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
                                        submitVote(false, USER_ID)
                                        setVote('No');}}
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
