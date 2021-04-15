import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import React, { useState, useEffect } from 'react';
import axios from "axios";

var IS_ADMIN = true;
var PROPOSAL_ID = 1;
var USER_ID = 4

const ANON = 'John Doe';

function ProposalConditionalRender(isAdmin) {

  /** Handles pressing the voteYes/voteNo buttons by adding the appropriate vote
   * to the database; works for both admin and nonadmin voting buttons. */
  async function submitVote(voteDecision) {
    try {
      const response = await axios.post('http://localhost:8000/submitVote', {
        vote: voteDecision,
        user_id: USER_ID,
        proposal_id: PROPOSAL_ID
      });
    } catch(error) {
        console.log("There was an error in submitting your vote.");
        console.log(error.stack);
    }
  }

  function AdminProposalConditionalRender() {
    var PROGRESS_VALUE = false;
    const [showProgressBars, setShowProgressBars] = useState(!PROGRESS_VALUE);

    /** Toggles view for admin conditional frame; returns progress bars
    * if admin toggle is set to "progress" and admin voting buttons if set to "vote" */
    function ToggleComponents(showProgress) {

      /* REACT STATES FOR PROGRESS BARS */ 
      const [votesTotal, setVotesTotal] = useState(0);
      const [totalMembers, setTotalMembers] = useState(1);
      const [percentNo, setPercentNo] = useState(0);
      const [percentYes, setPercentYes] = useState(0);
      const [percentUnvoted, setPercentUnvoted] = useState(0);

      /* REACT STATES FOR ADMIN VOTING BUTTONS */
      const adminPressedYesButtonClassName = 'pressedYesButton adminButton';
      const adminUnpressedYesButtonClassName = 'unpressedYesButton adminButton';
      const [adminYesButtonClassName, setAdminYesButtonClassName] = useState(adminUnpressedYesButtonClassName);
      const adminPressedNoButtonClassName = 'pressedNoButton adminButton';
      const adminUnpressedNoButtonClassName = 'unpressedNoButton adminButton';
      const [adminNoButtonClassName, setAdminNoButtonClassName] = useState(adminUnpressedNoButtonClassName);

      async function fetchVoteInfo() {
        const res = await axios.get('http://localhost:8000/getAllVotes', {params : {proposal_id: PROPOSAL_ID}});
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
    return (
      <div className='proposalConditional'>
        {ToggleComponents(showProgressBars)}
        {toggle}
      </div>
    );
  }

  /** Returns the proposalConditionalRender for non-admins,
  * which contains the non-admin voting buttons */
  function NonAdminProposalConditionalRender() {

    /* REACT STATES FOR NONADMIN VOTING BUTTONS */
    const nonAdminPressedYesButtonClassName = 'pressedYesButton nonAdminButton';
    const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton nonAdminButton';
    const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);

    const nonAdminPressedNoButtonClassName = 'pressedNoButton nonAdminButton';
    const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton nonAdminButton';
    const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);
    
    return (
      <div className='proposalConditional '>
        <div className='nonAdminConditionalContainer'>
          <div className='leftButtonContainer buttonContainer'>
            <ProposalButton buttonText='Vote Yes' buttonClassName={nonAdminYesButtonClassName}
              onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
                                  submitVote(true);}}
            />
          </div>
          <div className='rightButtonContainer buttonContainer'>
            <ProposalButton buttonText='Vote No' buttonClassName={nonAdminNoButtonClassName}
              onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
                                  submitVote(false);}}
            />
          </div>
        </div>
      </div>);
  }

  /* Actual returned html for the conditional render part of
  the proposal frame; admins get progress bars and voting buttons
  while nonAdmins only get voting buttons */
  if (isAdmin) {
    return AdminProposalConditionalRender();
  } else {
      return NonAdminProposalConditionalRender();
  }
}


function ProposalDetails() {

  /** Takes in a number and converts it to a dollar amount string w/ commas
  * placed appropriately (every 3 spaces); does not include dollar sign */
  function amountToDollarString(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalSponsor, setProposalSponsor] = useState('');
  const [proposalAmount, setProposalAmount] = useState(0);

  const [comments, setComments] = React.useState([]);
  const[textboxValue, setTextboxValue] = React.useState('');

  async function fetchProposalDetails() { 
    try {
      const response = await axios.get('http://localhost:8000/getProposalDetails', { params: { proposal_id: PROPOSAL_ID } });
      const proposalInfo = response.data;
      setProposalTitle(proposalInfo.title);
      setProposalDescription(proposalInfo.description_text);
      setProposalSponsor(proposalInfo.organization);
      setProposalAmount(amountToDollarString(proposalInfo.amount_requested.toFixed(2)));
    } catch (error) {
        console.log("Error in fetching proposal details.");
        console.log(error.stack);
    }
  }
  
  async function fetchCommentData() {
    try {
      const response = await axios.get("http://localhost:8000/get_comments", 
                                          { params: 
                                            { proposal_id: PROPOSAL_ID }
                                          });      
      setComments(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  const handleSubmitComment = async () => {
    if (textboxValue !== '') {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8000/post_comment',
          data: {
            user_id: USER_ID,
            proposal_id: PROPOSAL_ID,
            comment_text: textboxValue
          }
        });
      } catch(error) {
          console.log(error);
      }
      setTextboxValue('');
      fetchCommentData();
    }
  };

  useEffect(() => {
    fetchCommentData();
    fetchProposalDetails();
  }, [])

  /** Takes in an ISO timestamp string (as received from the database) and converts it
   * to a readable and meaningful string in the format 'MM/DD/YY HH:MM AM/PM' */
  function timestampToReadableDate(timestamp) {
    var militaryToTwelveHrTime = (hour) => {
      if (hour === 0) {
        return 12;
      } else if (hour <= 12) {
        return hour;
      } else {
        return hour - 12;
      }
    }
    var twoDigitMins = (mins) => mins < 10 ? `0${mins}` : `${mins}`;
    var dateObject = new Date(timestamp);
    var rawHour = dateObject.getHours();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    var year = dateObject.getFullYear().toString().substr(-2);
    var hour = militaryToTwelveHrTime(rawHour);
    var minutes = twoDigitMins(dateObject.getMinutes());
    var amOrPm = ((hour) => hour < 12 ? 'am' : 'pm')(rawHour);
    return `${month}/${day}/${year} ${hour}:${minutes}${amOrPm}`;
  }

  return (
    <div className="proposalDetailsPage">
      <div className="proposalLeft">
        <div className="proposalSummary">
          <div className="proposalTitle">
            {proposalTitle}
            <hr className="proposalDetailsUnderline"></hr>
          </div>
          <div className="proposalSponsor">{proposalSponsor}</div>
          <div className="proposalDescription">{proposalDescription}</div>
          <div className="proposalAmount"> Proposal Amount: {`$${proposalAmount}`}</div>
        </div>
        {ProposalConditionalRender(IS_ADMIN)}
      </div>

      <div className="discussion">
        <div className="discussionTitle">
          Discussion
          <hr className="proposalDetailsUnderline"></hr>
        </div>
        <div className='discussionCommentsView'>
        {comments.map((comment) => (
          // tgif.sql for comments on IS_ADMIN in comments db
          <DiscussionPost isAdmin={IS_ADMIN} userName={ANON} text={comment.comment_text} time={timestampToReadableDate(comment.time_posted)}/>
        ))}
        </div>
        <div className='discussionPostCommentFrame'>
          <div className='postCommentTopContainer postCommentContainer'>
            <div className='UserInput'>
              <div className='commentBoxHeader'>
                Leave a comment
              </div>
              <textarea value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} className= 'userInputDiscussion' id='userInputDiscussion' type='textarea' placeholder='comment'/>
            </div>
          </div>
          <div className='postCommentBottomContainer postCommentContainer'>
            <div className='postCommentButtonContainer'>
              <ProposalButton buttonClassName='genericProposalButton' buttonText='Post' onClickFunc={handleSubmitComment}/>
            </div>
          </div>
        </div>       
      </div>
    </div>
  );
}

export default ProposalDetails;