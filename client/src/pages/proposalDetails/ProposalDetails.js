import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

var PRIVILEGES = 'Voting Member';
let PROPOSAL_ID;
var USER_ID = 1;

const ANON = 'John Doe';

function ProposalConditionalRender(privileges) {

  /** Handles pressing the voteYes/voteNo buttons by adding the appropriate vote
   * to the database; works for both admin and nonadmin voting buttons. */
  async function submitVote(voteDecision) {
    try {
      await axios.post('http://localhost:8000/submitVote', {
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
    /* REACT STATES FOR PROGRESS BARS */ 
    const [votesTotal, setVotesTotal] = useState(0);
    const [totalMembers, setTotalMembers] = useState(1);
    const [percentNo, setPercentNo] = useState(0);
    const [percentYes, setPercentYes] = useState(0);
    const [percentUnvoted, setPercentUnvoted] = useState(0);

    async function fetchVoteInfo() {
      const res = await axios.get('http://localhost:8000/getAllVotes', {params : {proposal_id: PROPOSAL_ID}});
      const voteYes = res.data.amountYes;
      const votesTotal= res.data.totalVotes;
      const totalVotingMembers = res.data.totalVotingMembers;
      setVotesTotal(votesTotal);
      setTotalMembers(totalVotingMembers);
      setPercentYes(((voteYes / totalVotingMembers) * 100).toFixed(2));
      setPercentNo((((votesTotal - voteYes) / totalVotingMembers) * 100).toFixed(2));
      setPercentUnvoted((((totalVotingMembers - votesTotal) / totalVotingMembers) * 100).toFixed(2));
    }
    
    useEffect(() => {
      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        fetchVoteInfo();
      }, 5000)
    
      return () => clearInterval(intervalId); //This is important
     
    }, [])

    return (
      <div className='progressFrame'>
        <ProgressBar className='progressBarYesNoUnvoted'>
          <ProgressBar className='progressBarPercentYes' variant='success' now={percentYes} label={`${percentYes}% YES`} key={1}/>
          <ProgressBar className='progressBarPercentNo' variant='danger' now={percentNo} label={`${percentNo}% NO`} key={2}/>
          <ProgressBar className='progressBarPercentUnvoted' variant='customProgressBarUnvoted' now={percentUnvoted} label={`${percentUnvoted}% UNVOTED`} key={3}/>
        </ProgressBar>

        <ProgressBar className="progressBarPercentVotedUnvoted">
          <ProgressBar className='progressBarPercentVoted' variant='info' now={(((votesTotal) / totalMembers) * 100).toFixed(2)} label={`${(((votesTotal) / totalMembers) * 100).toFixed(2)}% VOTED`} key={1}/>
          <ProgressBar className='progressBarPercentUnvoted2' variant='customProgressBarUnvoted' now={percentUnvoted} label={`${percentUnvoted}% UNVOTED`} key={2}/>
        </ProgressBar>
        <div className='amountVotedLabel'>
          {`${votesTotal}/${totalMembers} Voted`}
        </div>
      </div>
    );
  }

  /** Returns the proposalConditionalRender for Voting Members,
  * which contains the non-admin voting buttons */
  function VotingMemberProposalConditionalRender() {
    PROPOSAL_ID = useParams().id;

    /* REACT STATES FOR NONADMIN VOTING BUTTONS */
    const nonAdminPressedYesButtonClassName = 'pressedYesButton nonAdminButton';
    const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton nonAdminButton';
    const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);

    const nonAdminPressedNoButtonClassName = 'pressedNoButton nonAdminButton';
    const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton nonAdminButton';
    const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);

    const [vote, setVote] = useState('Undecided');

    async function fetchUserVote() {
      try {
        const res = await axios.get('http://localhost:8000/get_one_vote', {params : {user_id: USER_ID, proposal_id: PROPOSAL_ID}});
        const vote = (res.data[0].vote);
        console.log(res);
        if (vote === true) {
          setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
          setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
          submitVote(true)
          setVote('Yes');
          console.log("changed vote to yes");
        } else if (vote === false) {
          setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
          setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
          submitVote(false)
          setVote('No');
          console.log("changed vote to no");
        }
        //setVote(res.data);
      } catch (error) {
        console.log("Error in fetching a user's vote.");
        console.log(error.stack);
      } 
    }
    
    useEffect(() => {
      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        fetchUserVote();
      }, 5000)
    
      return () => clearInterval(intervalId); //This is important
     
    }, [])
    
    return (
      <div className='proposalConditional'>
        <div className='NonVotingMemberConditionalContainer'>
          <div className='leftButtonContainer buttonContainer'>
            <ProposalButton buttonText='Vote Yes' buttonClassName={nonAdminYesButtonClassName}
              onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
                                  submitVote(true)
                                  setVote('Yes');}}
            />
          </div>
          <div className='rightButtonContainer buttonContainer'>
            <ProposalButton buttonText='Vote No' buttonClassName={nonAdminNoButtonClassName}
              onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
                                  submitVote(false)
                                  setVote('No');}}
            />
          </div>
          <div className='yourVoteLabel'>
            Your Vote: {vote}
          </div>
        </div>
      </div>
    );
  }

  /* Actual returned html for the conditional render part of
  the proposal frame; returns as follows:
  - Admin: Progress Bars
  - Voting Member: Voting Buttons
  - Non-Voting Members: Nothing
  */
  if (privileges === 'Admin') {
    return AdminProposalConditionalRender();
  } else if (privileges === 'Voting Member') {
      return VotingMemberProposalConditionalRender();
  } else {
    return null;
  }
}

function ProposalDetails() {
  PROPOSAL_ID = useParams().id;
  /** Takes in a number and converts it to a dollar amount string w/ commas
  * placed appropriately (every 3 spaces); does not include dollar sign */
  function amountToDollarString(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalSponsor, setProposalSponsor] = useState('');
  const [proposalLink, setProposalLink] = useState('');
  const [proposalAmount, setProposalAmount] = useState(0);

  const [comments, setComments] = React.useState([]);
  const[textboxValue, setTextboxValue] = React.useState('');

  async function fetchProposalDetails() { 
    try {
      const response = await axios.get('http://localhost:8000/get_proposal_details', 
                                          { params: { proposal_id: PROPOSAL_ID }});
      setProposalTitle(response.data.title);
      setProposalDescription(response.data.description_text);
      setProposalLink(response.data.link);
      setProposalSponsor(response.data.organization);
      setProposalAmount(amountToDollarString(response.data.amount_requested.toFixed(2)));
    } catch (error) {
        console.log("Error in fetching proposal details.");
        console.log(error.stack);
    }
  }
  
  async function fetchCommentData() {
    try {
      const response = await axios.get("http://localhost:8000/get_comments", 
                                          {params: { proposal_id: PROPOSAL_ID }});
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
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      fetchCommentData();
      fetchProposalDetails();
    }, 5000)
  
    return () => clearInterval(intervalId); //This is important
   
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
        <div className={(PRIVILEGES === 'Non-Voting Member') ? 'proposalSummary nonVotingProposalSummary' : "proposalSummary"}>
          <div className="proposalTitle">
            {proposalTitle}
            <hr className="proposalDetailsUnderline"></hr>
          </div>
          <div className="proposalSponsor">Sponsor: {proposalSponsor}</div>
          <div className={(PRIVILEGES === 'Non-Voting Member') ? ' proposalDescription nonVotingProposalDescription' : "proposalDescription"}>{proposalDescription}</div>
          <a className="proposalLink" href = {proposalLink}>{proposalTitle}.pdf</a>
          <div className="proposalAmount"> Proposal Amount: {`$${proposalAmount}`}</div>
          {ProposalConditionalRender(PRIVILEGES)}
        </div>
        
      </div>

      <div className="discussion">
        <div className="discussionTitle">
          Discussion
          <hr className="proposalDetailsUnderline"></hr>
        </div>
        <div className='discussionCommentsView'>
        {comments.map((comment) => (
          // tgif.sql for comments on IS_ADMIN in comments db
          <DiscussionPost isAdmin={PRIVILEGES==='Admin'} userName={ANON} text={comment.comment_text} time={timestampToReadableDate(comment.time_posted)}/>
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