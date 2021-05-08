import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import externalLinkIcon from '../../assets/external-link.svg';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

let PROPOSAL_ID;
const ANON = 'Anonymous';

function ProposalDetails(props) {

  PROPOSAL_ID = useParams().id;
  
  const PRIVILEGES = props.privileges;
  const USER_ID = props.userID;

  /** Takes in a number and converts it to a dollar amount string w/ commas
  * placed appropriately (every 3 spaces); does not include dollar sign */
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalSponsor, setProposalSponsor] = useState('');
  const [proposalLink, setProposalLink] = useState('');
  const [proposalAmount, setProposalAmount] = useState(0);

  const [comments, setComments] = React.useState([]);
  const[textboxValue, setTextboxValue] = React.useState('');

  /* REACT STATES FOR PROGRESS BARS */ 
  const [votesTotal, setVotesTotal] = useState(0);
  const [totalMembers, setTotalMembers] = useState(1);
  const [percentNo, setPercentNo] = useState(0);
  const [percentYes, setPercentYes] = useState(0);
  const [percentUnvoted, setPercentUnvoted] = useState(0);

  /* REACT STATES FOR NONADMIN VOTING BUTTONS */
  const nonAdminPressedYesButtonClassName = 'pressedYesButton nonAdminButton';
  const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton nonAdminButton';
  const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);

  const nonAdminPressedNoButtonClassName = 'pressedNoButton nonAdminButton';
  const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton nonAdminButton';
  const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);

  const [vote, setVote] = useState('Undecided');

  function ProposalConditionalRender() {  
    /** Handles pressing the voteYes/voteNo buttons by adding the appropriate vote
     * to the database; works for both admin and nonadmin voting buttons. */  
    function AdminProposalConditionalRender() {  
      return (
        <div className='progressFrame'>
          <ProgressBar className='progressBarYesNoUnvoted'>
            <ProgressBar className='progressBarPercentYes' variant='success' now={percentYes * 100} label={`${percentYes} YES`} key={1}/>
            <ProgressBar className='progressBarPercentNo' variant='danger' now={percentNo * 100} label={`${percentNo} NO`} key={2}/>
            <ProgressBar className='progressBarPercentUnvoted' variant='customProgressBarUnvoted' now={percentUnvoted * 100} label={`${percentUnvoted} UNDECIDED`} key={3}/>
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
      return (
        <div className='proposalConditional'>
          <div className='NonVotingMemberConditionalContainer'>
            <div className='VoteButtonsWrapperDetails'>
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
              <div className='yourVoteLabel'>
                Your Vote: {vote}
              </div>
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
    if (PRIVILEGES === 'Admin') {
      return AdminProposalConditionalRender(USER_ID);
    } else if (PRIVILEGES === 'Voting Member') {
        return VotingMemberProposalConditionalRender(USER_ID);
    } else {
      return null;
    }
  };

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
  };

  async function fetchVoteInfo() {
    const res = await axios.get('http://localhost:8000/getAllVotes', {params : {proposal_id: PROPOSAL_ID}});
    const voteYes = res.data.amountYes;
    const votesTotal= res.data.totalVotes;
    const totalVotingMembers = res.data.totalVotingMembers;
    setVotesTotal(votesTotal);
    setTotalMembers(totalVotingMembers);
    setPercentYes(voteYes);
    setPercentNo(votesTotal - voteYes);
    setPercentUnvoted(totalVotingMembers - votesTotal);
  };

  async function fetchUserVote() {
    try {
      const res = await axios.get('http://localhost:8000/get_one_vote', {params : {user_id: USER_ID, proposal_id: PROPOSAL_ID}});
      const vote = (res.data[0].vote);
      if (vote === true) {
        setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
        setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
        submitVote(true)
        setVote('Yes');
      } else if (vote === false) {
        setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
        setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
        submitVote(false)
        setVote('No');
      }
      // setVote(res.data);
    } catch (error) {
      console.log("Error in fetching a user's vote.");
      console.log(error.stack);
    } 
  };

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
  };
  
  async function fetchCommentData() {
    try {
      const response = await axios.get("http://localhost:8000/get_comments", 
                                          { params: 
                                            { proposal_id: PROPOSAL_ID,}
                                          });     
      setComments(response.data);
    } catch (error) {
        console.error(error);
    }
  };

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

  /** Takes in an ISO timestamp string (as received from the database) and converts it
   * to a readable and meaningful string in the format 'MM/DD/YY HH:MM AM/PM' */
  function timestampToReadableDate(timestamp) {
    const militaryToTwelveHrTime = (hour) => {
      if (hour === 0) {
        return 12;
      } else if (hour <= 12) {
        return hour;
      } else {
        return hour - 12;
      }
    }
    const twoDigitMins = (mins) => mins < 10 ? `0${mins}` : `${mins}`;
    const dateObject = new Date(timestamp);
    const rawHour = dateObject.getHours();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear().toString().substr(-2);
    const hour = militaryToTwelveHrTime(rawHour);
    const minutes = twoDigitMins(dateObject.getMinutes());
    const amOrPm = ((hour) => hour < 12 ? 'am' : 'pm')(rawHour);
    return `${month}/${day}/${year} ${hour}:${minutes}${amOrPm}`;
  };

  function amountToDollarString(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (PRIVILEGES === "Admin") {
      fetchVoteInfo();
    }
    else if (PRIVILEGES === "Voting Member"){
      fetchUserVote();
    }
    fetchCommentData();
    fetchProposalDetails();
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      fetchCommentData();
      fetchProposalDetails();
    }, 3000)
  
    return () => clearInterval(intervalId);
   
  }, [PRIVILEGES])

  const linkHref = (propLink) => (propLink.startsWith("http") ? propLink : "http://" + propLink)

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
          <div className='proposalLinkContainer'>
            <a className="proposalLink" href={linkHref(proposalLink)} target='_blank' rel='noreferrer'>
              Link to Full Proposal&nbsp;
              <img className='externalLinkIcon' src={externalLinkIcon} alt="external link" href={linkHref(proposalLink)}/>
            </a>
          </div>
          <div className="proposalAmount"> Proposal Amount: {`$${proposalAmount}`}</div>
          {ProposalConditionalRender()}
        </div>
      </div>

      <div className="discussion">
        <div className="discussionTitle">
          Discussion
          <hr className="proposalDetailsUnderline"></hr>
        </div>
        <div className='discussionCommentsView'>
          {comments.map((comment) => (
          <DiscussionPost isAdmin={PRIVILEGES==='Admin'} userName={ANON} isHighlighted={comment.user_id === USER_ID} id={comment.user_id} text={comment.comment_text} time={timestampToReadableDate(comment.time_posted)}/>
         ))}
        </div>
        <div className='discussionPostCommentFrame'>
          <div className='postCommentTopContainer postCommentContainer'>
            <div className='UserInput'>
              <div className='commentBoxHeader'>
                Leave a comment
              </div>
              <textarea value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} className= 'userInputDiscussion' id='userInputDiscussion' type='textarea' placeholder='I think...'/>
            </div>
          </div>
          <div className='postCommentBottomContainer postCommentContainer'>
            <div className='postCommentButtonContainer'>
              <ProposalButton buttonClassName='genericProposalButtonDets' buttonText='Post' onClickFunc={handleSubmitComment}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;