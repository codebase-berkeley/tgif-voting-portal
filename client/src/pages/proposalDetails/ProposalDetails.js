import './ProposalDetails.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DiscussionPost from './DiscussionPost.js';
import ProposalButton from './ProposalButton.js';

var IS_ADMIN = true;
var DEADLINE = '3/5/21';
var AMOUNT = 14360;

var TOTAL_MEMBERS = 60;
var AMOUNT_VOTED = 84;
var PERCENT_YES = 50;
var PERCENT_NO = 20;
var PERCENT_UNVOTED = 30;

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
  if (isAdmin) {
    return (
      <div className='progressBarsFrame'>
        <ProgressBar className='progressBarYesNoUnvoted'>
          <ProgressBar className='progressBarPercentYes' variant='success' now={PERCENT_YES} label={`${PERCENT_YES}% YES`} key={1}/>
          <ProgressBar className='progressBarPercentNo' variant='danger' now={PERCENT_NO} label={`${PERCENT_NO}% NO`} key={2}/>
          <ProgressBar className='progressBarPercentUnvoted' variant='customProgressBarUnvoted' now={PERCENT_UNVOTED} label={`${PERCENT_UNVOTED}% UNVOTED`} key={3}/>
        </ProgressBar>
        <div className='amountVotedLabel'>
          20/30 Voted
        </div>
      </div>);
  } else {
    return <div>voting buttons</div>;
  }
}

/** we need this to set a global var? with useState? */
function ConditionalToggleRender(isAdmin) {
  if (isAdmin) {
    return (
      // <div className="toggle">
      //   <input type="checkbox" />
      //   <div className="circle"></div>
      //   <div className="toggleLeft">vote</div> <div className="toggleRight">progress</div>
      // </div>
        <div className="switch_container">

          <label class="switch">
            <input type="checkbox" name= "" id=""/>
            <span class="slider round"></span>
          </label>

          <div className="labels">
            <div className="toggleLeft">vote&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 
            <div className="toggleRight">progress</div>
          </div>
          
        </div>
    )
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
          <div className='proposalConditional'>
            {ConditionalProposalRender(IS_ADMIN)}
            {ConditionalToggleRender(IS_ADMIN)}
          </div>
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