import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import React, { useState } from 'react';

var IS_ADMIN = true;

const YES_VOTE = true;
const NO_VOTE = !YES_VOTE;

var TOTAL_MEMBERS = 40;
var AMOUNT_VOTED = 28;
var AMOUNT_YES = 20;
var AMOUNT_NO = AMOUNT_VOTED - AMOUNT_YES;
var PERCENT_YES = AMOUNT_YES / TOTAL_MEMBERS * 100;
var PERCENT_NO = AMOUNT_NO / TOTAL_MEMBERS * 100;
var PERCENT_UNVOTED = (TOTAL_MEMBERS - AMOUNT_VOTED) / TOTAL_MEMBERS * 100;

var DUMMY_DEADLINE = '3/5/21';
var DUMMY_AMOUNT = 14360;
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
var DUMMY_DESCRIPTION = `The Earth Action Initiative will organize a variety of
events and actions that build community, leverage existing
efforts, inspire new plans, and find innovative ways to
execute these actions through effective communication.`;

var TEMP_TEXT_INPUT;
var TEMP_TIME_INPUT;
var TEMP_USER_INPUT;

/** Takes in a number and converts it to a dollar amount string w/ commas
 * placed appropriately (every 3 spaces); does not include dollar sign */
function amountToDollarString(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProposalConditionalRender(isAdmin) {

  var VOTE_VALUE = false;
  var PROGRESS_VALUE = !VOTE_VALUE;

  const [showProgressBars, setToggleView] = useState(VOTE_VALUE);

    /** Toggles view for admin conditional frame; returns progress bars
     * if admin toggle is set to "progress" and admin voting buttons if set to "vote" */
    function ToggleComponents(showProgress) {
      
      const adminPressedYesButtonClassName = 'pressedYesButton adminButton';
      const adminUnpressedYesButtonClassName = 'unpressedYesButton adminButton';
      const [adminYesButtonClassName, setAdminYesButtonClassName] = useState(adminUnpressedYesButtonClassName);

      const adminPressedNoButtonClassName = 'pressedNoButton adminButton';
      const adminUnpressedNoButtonClassName = 'unpressedNoButton adminButton';
      const [adminNoButtonClassName, setAdminNoButtonClassName] = useState(adminUnpressedNoButtonClassName);

      const [adminVote, changeAdminVote] = useState('Unvoted');

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
                onClickFunc={() => {setAdminYesButtonClassName(adminPressedYesButtonClassName);
                                    setAdminNoButtonClassName(adminUnpressedNoButtonClassName);;
                                    changeAdminVote(YES_VOTE);}}
              />
            </div>
            <div className='rightButtonContainer buttonContainer'>
              <ProposalButton buttonText='Vote No' isVotingButton={true} buttonClassName={adminNoButtonClassName}
                onClickFunc={() => {setAdminYesButtonClassName(adminUnpressedYesButtonClassName);
                                    setAdminNoButtonClassName(adminPressedNoButtonClassName);
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
      const nonAdminPressedYesButtonClassName = 'pressedYesButton nonAdminButton';
      const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton nonAdminButton';
      const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);

      const nonAdminPressedNoButtonClassName = 'pressedNoButton nonAdminButton';
      const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton nonAdminButton';
      const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);

      const [nonAdminVote, changeNonAdminVote] = useState('Unvoted');
      
      return (
        <div className='proposalConditional '>
          <div className='leftButtonContainer buttonContainer'>
            <ProposalButton buttonText='Vote Yes' isVotingButton={true} buttonClassName={nonAdminYesButtonClassName}
              onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);;
                                  changeNonAdminVote(YES_VOTE);}}
            />
          </div>
          <div className='rightButtonContainer buttonContainer'>
            <ProposalButton buttonText='Vote No' isVotingButton={true} buttonClassName={nonAdminNoButtonClassName}
              onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
                                  changeNonAdminVote(NO_VOTE);}}
            />
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

function inputFunc(){
  TEMP_TEXT_INPUT = document.getElementById("userInputDiscussion");
  console.log(TEMP_TEXT_INPUT);
}

function ProposalDetails() {
  return (
    <div className="proposalDetailsPage">
      <div className="proposalLeft">
        <div className="proposalSummary">
          <div className="proposalTitle">
            Proposal Title
            <hr className="underline"></hr>
          </div>
          <div className="proposalSponsor">Proposal Sponsor </div>
          <div className="proposalDescription">proposal description</div>
          <div className="proposalAmount"> proposal amount: {`$${amountToDollarString(DUMMY_AMOUNT)}`}</div>
          <div className="proposalDeadline"> proposal deadline: {DUMMY_DEADLINE} </div>
        </div>
        {ProposalConditionalRender(IS_ADMIN)}
      </div>

      <div className="discussion">
        <div className="discussionTitle">
          Discussion
          <hr className="underline"></hr>
        </div>
        <div className='discussionCommentsView'>
          <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT1.userName} text={DUMMY_COMMENT1.text} time={DUMMY_COMMENT1.time}/>
          <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_COMMENT2.userName} text={DUMMY_COMMENT2.text} time={DUMMY_COMMENT2.time}/>
        </div>
        <div className='discussionPostCommentFrame'>
          <div className='postCommentTopContainer postCommentContainer'>
            <div className='UserInput'>
              <input className= 'userInputDiscussion' id='userInputDiscussion' type='text' placeholder='your comment'/>
              <button className= 'buttonInputDiscussion' type="button" onClick={inputFunc()}>
                Submit
              </button>
            </div>
          </div>
          <div className='postCommentBottomContainer postCommentContainer'>
            <ProposalButton buttonText='Post'/>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default ProposalDetails;