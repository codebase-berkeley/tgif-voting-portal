import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';
import React, { useState } from 'react';

var IS_ADMIN = true;
var DEADLINE = '3/5/21';
var AMOUNT = 14360;

var TOTAL_MEMBERS = 40;
var AMOUNT_VOTED = 28;
var PERCENT_YES = 50;
var PERCENT_NO = 20;
var PERCENT_UNVOTED = (TOTAL_MEMBERS - AMOUNT_VOTED) / TOTAL_MEMBERS * 100;

var DUMMY_USER1 = 'kalea';
var DUMMY_USER2 = 'jorge';

var DUMMY_TEXT1 = 'i like this';
var DUMMY_TEXT2 = 'i dont like this';

var DUMMY_TIME1 = '3/26/21 3:12pm';
var DUMMY_TIME2 = '3/27/21 10:09pm';

var WHITESPACE = <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>;

var DUMMY_DESCRIPTION = `The Earth Action Initiative will organize a variety of
events and actions that build community, leverage existing
efforts, inspire new plans, and find innovative ways to
execute these actions through effective communication.`;


/** Takes in a number and converts it to a dollar amount string w/ commas
placed appropriately (every 3 spaces); does not include dollar sign
*/
function amountToDollarString(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ConditionalProposalRender(isAdmin) {

  var VOTE_VALUE = false;
  var PROGRESS_VALUE = !VOTE_VALUE;

  function checkboxTest() {
    // var toggle = document.getElementById("propDetailsToggle");
    // if (toggle.checked) {
    //   console.log("show me progress bars");
    // } else {
    //   console.log("show me voting buttons");
    // }
  }

  const [showProgress, setToggleView] = useState(VOTE_VALUE);
  const toggle = 
                <div className="switchFrame">
                          <label class="toggleContainer">
                            <input type="checkbox" name="adminView" id="propDetailsToggle" value="true" onClick={() => setToggleView(!showProgress)}/>
                            <span class="slider round"></span>
                          </label>
                          <div className="toggleLabels">
                            <div className="toggleLeft">vote&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 
                            <div className="toggleRight">progress</div>
                          </div>
                </div>;

    /* Returns progress bars if admin toggle is set to "progress" and
    admin voting buttons if set to "vote" */
    function ToggleComponents(showProgress) {
      if (showProgress == VOTE_VALUE) {
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
            admin voting buttons
          </div>
        );
      }
    }

  /* Returned html for ConditionalProposalRender */
  if (isAdmin) {
    return (
      <div className='proposalConditional'>
        {ToggleComponents(showProgress)}
        {toggle}
      </div>
    );
  } else {
      return (
        <div className='proposalConditional'>
          non-admin voting buttons
        </div>);
  }
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
          <div className="proposalAmount"> proposal amount: {`$${amountToDollarString(AMOUNT)}`}</div>
          <div className="proposalDeadline"> proposal deadline: {DEADLINE} </div>
        </div>
        {ConditionalProposalRender(IS_ADMIN)}
      </div>
      <div className="discussion">
      <div className="discussionTitle">
            Discussion
            <hr className="underline"></hr>

            <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_USER1} text={DUMMY_TEXT1} time={DUMMY_TIME1}/>
            <DiscussionPost isAdmin={IS_ADMIN} userName={DUMMY_USER2} text={DUMMY_TEXT2} time={DUMMY_TIME2}/>
          </div>

        discussion
        <ProposalButton />
      </div>
    </div>
  );
}

  export default ProposalDetails;