import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import React, { useState, useEffect } from 'react';
import axios from "axios";

var IS_ADMIN = true;

const YES_VOTE = true;
const NO_VOTE = !YES_VOTE;

/** Takes in a number and converts it to a dollar amount string w/ commas
 * placed appropriately (every 3 spaces); does not include dollar sign */
function amountToDollarString(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProposalConditionalRender(isAdmin) {

  var PROGRESS_VALUE = false;
  const [showProgressBars, setShowProgressBars] = useState(!PROGRESS_VALUE);

    /** Toggles view for admin conditional frame; returns progress bars
     * if admin toggle is set to "progress" and admin voting buttons if set to "vote" */
    function ToggleComponents(showProgress) {
      const [votesTotal, setVotesTotal] = useState(0);
      const [totalMembers, setTotalMembers] = useState(1);
      const [percentNo, setPercentNo] = useState(0);
      const [percentYes, setPercentYes] = useState(0);
      const [percentUnvoted, setPercentUnvoted] = useState(0);

      async function fetchVoteInfo() {
        const res = await axios.get('http://localhost:8000/getAllVotes', {params : {proposal_id: 1}});
        const voteYes = res.data.amountYes;
        const votesTotal= res.data.totalVotes;
        const totalMembers = res.data.totalUsers;
        setVotesTotal(votesTotal);
        setTotalMembers(totalMembers);
        setPercentYes((voteYes / totalMembers) * 100);
        setPercentNo(((votesTotal - voteYes) / totalMembers) * 100);
        setPercentUnvoted(((totalMembers - votesTotal) / totalMembers) * 100);
      }
      
      useEffect(() => {
        fetchVoteInfo();
      }, [])

      const adminPressedYesButtonClassName = 'pressedYesButton adminButton';
      const adminUnpressedYesButtonClassName = 'unpressedYesButton adminButton';
      const [adminYesButtonClassName, setAdminYesButtonClassName] = useState(adminUnpressedYesButtonClassName);

      const adminPressedNoButtonClassName = 'pressedNoButton adminButton';
      const adminUnpressedNoButtonClassName = 'unpressedNoButton adminButton';
      const [adminNoButtonClassName, setAdminNoButtonClassName] = useState(adminUnpressedNoButtonClassName);

      async function submitVote(voteDecision) {
        try {
          const response = await axios.post('http://localhost:8000/submitVote', {
            vote: voteDecision,
            user_id: 4,
            proposal_id: 1
          });
        } catch(error) {
          console.log("There was an error in submitting your vote.");
          console.log(error.stack);
        }
      }

      if (showProgress === PROGRESS_VALUE) {
        return (
          <div className='progressFrame adminToggleView'>
            <ProgressBar className='progressBarYesNoUnvoted'>
              <ProgressBar className='progressBarPercentYes' variant='success' now={percentYes} label={`${percentYes}% YES`} key={1}/>
              <ProgressBar className='progressBarPercentNo' variant='danger' now={percentNo} label={`${percentNo}% NO`} key={2}/>
              <ProgressBar className='progressBarPercentUnvoted' variant='customProgressBarUnvoted' now={percentUnvoted} label={`${percentUnvoted}% UNVOTED`} key={3}/>
            </ProgressBar>
  
            <ProgressBar className="progressBarPercentVotedUnvoted">
              <ProgressBar className='progressBarPercentVoted' variant='info' now={percentYes + percentNo} label={`${percentYes + percentNo}% VOTED`} key={1}/>
              <ProgressBar className='progressBarPercentUnvoted2' variant='customProgressBarUnvoted' now={percentUnvoted} label={`${percentUnvoted}% UNVOTED`} key={2}/>
            </ProgressBar>
            <div className='amountVotedLabel'>
              {`${votesTotal}/${totalMembers} Voted`}
            </div>
          </div>);
      } else {
        return (
          <div className='adminVotingButtonsFrame adminToggleView'>
            <div className='leftButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote Yes' isVotingButton={true} buttonClassName={adminYesButtonClassName}
                onClickFunc={async () => {setAdminYesButtonClassName(adminPressedYesButtonClassName);
                                    setAdminNoButtonClassName(adminUnpressedNoButtonClassName);
                                    await submitVote(true);
                                    fetchVoteInfo();}}
              />
            </div>
            <div className='rightButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote No' isVotingButton={true} buttonClassName={adminNoButtonClassName}
                onClickFunc={async () => {setAdminYesButtonClassName(adminUnpressedYesButtonClassName);
                                    setAdminNoButtonClassName(adminPressedNoButtonClassName);
                                    await submitVote(false);
                                    fetchVoteInfo();}}
              />
            </div>
          </div>
        );
      }
    }

    /** Returns the proposalConditionalRender for non-admins,
     * which contains the non-admin voting buttons */
    function NonAdminProposalConditionalRender() {

      /** REACT STATES */
      const nonAdminPressedYesButtonClassName = 'pressedYesButton nonAdminButton';
      const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton nonAdminButton';
      const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);

      const nonAdminPressedNoButtonClassName = 'pressedNoButton nonAdminButton';
      const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton nonAdminButton';
      const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);

      const [nonAdminVote, changeNonAdminVote] = useState('Unvoted');

      async function submitVote(voteDecision) {
        try {
          const response = await axios.post('http://localhost:8000/submitVote', {
            vote: voteDecision,
            user_id: 4,
            proposal_id: 1
          });
        } catch(error) {
          console.log("There was an error in submitting your vote.");
          console.log(error.stack);
        }
      }
      
      return (
        <div className='proposalConditional '>
          <div className='nonAdminConditionalContainer'>
            <div className='leftButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote Yes' buttonClassName={nonAdminYesButtonClassName}
                onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                    setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
                                    submitVote(true);
                                    changeNonAdminVote(YES_VOTE);}}
              />
            </div>
            <div className='rightButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote No' buttonClassName={nonAdminNoButtonClassName}
                onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
                                    setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
                                    submitVote(false);
                                    changeNonAdminVote(NO_VOTE);}}
              />
            </div>
          </div>
        </div>);
    }

  const toggle = 
    <div className="switchFrame">
              <label className="toggleContainer">
                <input type="checkbox" name="adminView" id="propDetailsToggle"
                  value="true" onClick={() => setShowProgressBars(!showProgressBars)}
                />
                <span className="slider round"></span>
              </label>
              <div className="toggleLabels">
                <div className="toggleLeft">
                  vote&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div> 
                <div className="toggleRight">progress</div>
              </div>
    </div>;

  /* Actual returned html for the conditional render part of
  the proposal frame; admins get progress bars and voting buttons
  while nonAdmins only get voting buttons */
  if (isAdmin) {
    return (
      <div className='proposalConditional'>
        {ToggleComponents(showProgressBars)}
        {toggle}
      </div>
    );
  } else {
      return NonAdminProposalConditionalRender();
  }
}


function ProposalDetails() {
  const [proposalTitle, setProposalTitle] = useState('Proposal Title');
  const [proposalDescription, setProposalDescription] = useState('Generic proposal description');
  const [proposalSponsor, setProposalSponsor] = useState('Proposal Sponsor');
  const [proposalAmount, setProposalAmount] = useState(0);
  const [proposalDeadline, setProposalDeadline] = useState("");

  const [comments, setComments] = React.useState([]);
  const[value, setValue] = React.useState('');

  async function fetchProposalDetails() { 
    try {
      const response = await axios.get('http://localhost:8000/getProposalDetails', { params: { proposal_id: 1 } });
      const proposalInfo = response.data;
      setProposalTitle(proposalInfo.title);
      setProposalDescription(proposalInfo.description_text);
      setProposalSponsor(proposalInfo.organization);
      setProposalAmount(proposalInfo.amount_requested.toFixed(2));
      setProposalDeadline(proposalInfo.deadline);
    } catch (error) {
      console.log("Error in fetching proposal details.");
      console.log(error.stack);
    }
  }
  
  async function fetchCommentData() {
    try {
      const response = await axios.get("http://localhost:8000/get_comments", 
                                          { params: 
                                            { proposal_id: 1 }
                                          });      
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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
    fetchCommentData();
  };

  useEffect(() => {
    fetchCommentData();
    fetchProposalDetails();
  }, [])

  return (
    <div className="proposalDetailsPage">
      <div className="proposalLeft">
        <div className="proposalSummary">
          <div className="proposalTitle">
            {proposalTitle}
            <hr className="underline"></hr>
          </div>
          <div className="proposalSponsor">{proposalSponsor}</div>
          <div className="proposalDescription">{proposalDescription}</div>
          <div className="proposalAmount"> Proposal Amount: {`$${proposalAmount}`}</div>
          <div className="proposalDeadline"> Proposal Deadline: {proposalDeadline} </div>
        </div>
        {ProposalConditionalRender(IS_ADMIN)}
      </div>

      <div className="discussion">
        <div className="discussionTitle">
          Discussion
          <hr className="underline"></hr>
        </div>
        <div className='discussionCommentsView'>
        {comments.map((comment) => (
          // tgif.sql for comments on IS_ADMIN in comments db
          <DiscussionPost isAdmin={IS_ADMIN} userName={comment.user_id} text={comment.comment_text} time={comment.time_posted}/>
        ))}
        </div>
        <div className='discussionPostCommentFrame'>
          <div className='postCommentTopContainer postCommentContainer'>
            <div className='UserInput'>
              <div className='commentBoxHeader'>
                Leave a comment
              </div>
              <textarea value={value} onChange={(event) => {setValue(event.target.value)}} className= 'userInputDiscussion' id='userInputDiscussion' type='textarea' placeholder='your comment'/>
            </div>
          </div>
          <div className='postCommentBottomContainer postCommentContainer'>
            <div className='postCommentButtonContainer'>
              <ProposalButton buttonClassName='genericProposalButton' buttonText='Post' onClickFunc={handleSubmit}/>
            </div>
          </div>
        </div>       
      </div>
    </div>
  );
}

export default ProposalDetails;