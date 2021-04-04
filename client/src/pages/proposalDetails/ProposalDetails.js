import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import React, { useState, useEffect } from 'react';
import axios from "axios";

var IS_ADMIN = true;

const YES_VOTE = true;
const NO_VOTE = !YES_VOTE;

var DUMMY_USERNAME = 'Beyonce';
var DUMMY_COMMENT1 = {
  userName: 'kalea',
  text: 'i like this proposal, i think we should approve it',
  time: '3/26/21 3:12pm'
};
var DUMMY_COMMENT2 = {
  userName: 'jorge',
  text: 'i dont like this, their proposal sucks',
  time: '3/27/21 10:09pm'
};

var DUMMY_LONG_COMMENT = `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. um is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a
placeholder before final copy is available. It is a long established fact that a reader will be distracted by the readable content of a 
page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
normal distribution of letters, as opposed to using 'Content here, content here', making it look like
readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour
and the like).`;

var DUMMY_MEDIUM_COMMENT = `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. um is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a
placeholder before final copy is available. It is a long established fact that a reader will be distracted by the readable content of a 
page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
normal distribution of letters.`;

/** Takes in a number and converts it to a dollar amount string w/ commas
 * placed appropriately (every 3 spaces); does not include dollar sign */
function amountToDollarString(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProposalConditionalRender(isAdmin) {

  var PROGRESS_VALUE = false;
  const [showProgressBars, setToggleView] = useState(!PROGRESS_VALUE);

    /** Toggles view for admin conditional frame; returns progress bars
     * if admin toggle is set to "progress" and admin voting buttons if set to "vote" */
    function ToggleComponents(showProgress) {
      const [AMOUNT_YES, setYesVotes] = useState(0);
      const [AMOUNT_VOTED, setVotesTotal] = useState(0);
      const [TOTAL_MEMBERS, setTotalMembers] = useState(1);
      const [PERCENT_NO, setPercentNo] = useState(0);
      const [PERCENT_YES, setPercentYes] = useState(0);
      const [PERCENT_UNVOTED, setPercentUnvoted] = useState(0);

      async function fetchVoteInfo() {
        const res = await axios.get('http://localhost:8000/getAllVotes', {params : {proposal_id: 1}});
        const voteYes = res.data[0][0].count;
        const votesTotal= res.data[1][0].count;
        const totalMembers = res.data[2][0].count;
        console.log(voteYes);
        console.log(votesTotal);
        console.log(totalMembers);
        
        setYesVotes(voteYes);
        setVotesTotal(votesTotal);
        setTotalMembers(totalMembers);
        setPercentYes((voteYes/totalMembers)*100);
        setPercentNo(((votesTotal - voteYes) / totalMembers)*100);
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

      const [adminVote, changeAdminVote] = useState('Unvoted');

      async function submitVote(voteDecision) {
        await axios.post('http://localhost:8000/submitVote', { vote: voteDecision, user_id: 4, proposal_id: 1});
      }

      if (showProgress == PROGRESS_VALUE) {
        return (
          <div className='progressFrame adminToggleView'>
            <ProgressBar className='progressBarYesNoUnvoted'>
              <ProgressBar className='progressBarPercentYes' variant='success' now={PERCENT_YES} label={`${PERCENT_YES}% YES`} key={1}/>
              <ProgressBar className='progressBarPercentNo' variant='danger' now={PERCENT_NO} label={`${PERCENT_NO}% NO`} key={2}/>
              <ProgressBar className='progressBarPercentUnvoted' variant='customProgressBarUnvoted' now={PERCENT_UNVOTED} label={`${PERCENT_UNVOTED}% UNVOTED`} key={3}/>
            </ProgressBar>
  
            <ProgressBar className="progressBarPercentVotedUnvoted">
              <ProgressBar className='progressBarPercentVoted' variant='info' now={PERCENT_YES + PERCENT_NO} label={`${PERCENT_YES + PERCENT_NO}% VOTED`} key={1}/>
              <ProgressBar className='progressBarPercentUnvoted2' variant='customProgressBarUnvoted' now={PERCENT_UNVOTED} label={`${PERCENT_UNVOTED}% UNVOTED`} key={2}/>
            </ProgressBar>
            <div className='amountVotedLabel'>
              {`${AMOUNT_VOTED}/${TOTAL_MEMBERS} Voted`}
            </div>
          </div>);
      } else {
        return (
          <div className='adminVotingButtonsFrame adminToggleView'>
            <div className='leftButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote Yes' isVotingButton={true} buttonClassName={adminYesButtonClassName}
                onClickFunc={async () => {setAdminYesButtonClassName(adminPressedYesButtonClassName);
                                    setAdminNoButtonClassName(adminUnpressedNoButtonClassName);;
                                    await submitVote(true);
                                    fetchVoteInfo();
                                    changeAdminVote(YES_VOTE);}}
              />
            </div>
            <div className='rightButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote No' isVotingButton={true} buttonClassName={adminNoButtonClassName}
                onClickFunc={async () => {setAdminYesButtonClassName(adminUnpressedYesButtonClassName);
                                    setAdminNoButtonClassName(adminPressedNoButtonClassName);
                                    await submitVote(false);
                                    fetchVoteInfo();
                                    changeAdminVote(NO_VOTE);}}
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
        const response = await axios.post('http://localhost:8000/submitVote', {
          vote: voteDecision,
          user_id: 4,
          proposal_id: 1
        });
        console.log(response);
      }
      
      return (
        <div className='proposalConditional '>
          <div className='nonAdminConditionalContainer'>
            <div className='leftButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote Yes' buttonClassName={nonAdminYesButtonClassName}
                onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                    setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);;
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
                  value="true" onClick={() => setToggleView(!showProgressBars)}
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
  const [proposalSponser, setProposalSponser] = useState('Proposal Sponser');
  const [proposalAmount, setProposalAmount] = useState(0);
  const [proposalDeadline, setProposalDeadline] = useState("");

  async function fetchProposalDetails() { 
    const response = await axios.get('http://localhost:8000/getProposalDetails', { params: { proposal_id: 1 } });
    const proposalInfo = response.data;
    setProposalTitle(proposalInfo.title);
    setProposalDescription(proposalInfo.description_text);
    setProposalSponser(proposalInfo.organization);
    setProposalAmount(proposalInfo.amount_requested);
    setProposalDeadline(proposalInfo.deadline);
  }

  const [comments, addComment] = useState(
    [
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_LONG_COMMENT} time={DUMMY_COMMENT1.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_MEDIUM_COMMENT} time={DUMMY_COMMENT1.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_COMMENT1.text} time={DUMMY_COMMENT1.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_COMMENT1.text} time={DUMMY_COMMENT1.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_COMMENT1.text} time={DUMMY_COMMENT1.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_COMMENT1.text} time={DUMMY_COMMENT1.time}/>,
      <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>
    ]
  )

  function postComment() {
    var textBox = document.getElementById("userInputDiscussion");
    var commentText = textBox.value;
    if (commentText != '') {
      textBox.value = '';
      var currentDate = new Date();
      var twelveHrTime = (hour) => {
        if (hour == 0) {
          return 12;
        } else if (hour <= 12) {
          return hour;
        } else {
          return hour - 12;
        }
      }
      var twoDigitMins = (mins) => mins < 10 ? `0${mins}` : `${mins}`;
      var currentHour = currentDate.getHours();
      var amOrPm = (hour) => hour <= 12 ? 'am' : 'pm';
      var commentDate = `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear().toString().substr(-2)} ${twelveHrTime(currentHour)}:${twoDigitMins(currentDate.getMinutes())}${amOrPm(currentHour)}`;
      var newComment = <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_USERNAME}
        text={commentText} time={commentDate}/>;
      addComment(comments.concat([newComment]));
    }
  }

  useEffect(() => {
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
          <div className="proposalSponsor">{proposalSponser}</div>
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
          {comments}
        </div>
        <div className='discussionPostCommentFrame'>
          <div className='postCommentTopContainer postCommentContainer'>
            <div className='UserInput'>
              <div className='commentBoxHeader'>
                Leave a comment!
              </div>
              <input className= 'userInputDiscussion' id='userInputDiscussion' type='textarea' placeholder='your comment'/>
            </div>
          </div>
          <div className='postCommentBottomContainer postCommentContainer'>
            <div className='postCommentButtonContainer'> 
              <ProposalButton buttonClassName='genericProposalButton' buttonText='Post' onClickFunc={postComment}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;