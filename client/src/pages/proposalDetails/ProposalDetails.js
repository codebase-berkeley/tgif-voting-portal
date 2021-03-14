import './ProposalDetails.css';
import ProgressBarDummy from './ProgressBar.js';
import ProgressBar from 'react-bootstrap/ProgressBar'

var IS_ADMIN = true;
var DEADLINE = '3/5/21';
var AMOUNT = 14360;
var PERCENT_VOTED = 60;
var PERCENT_YES = 20;
var DUMMY_DESCRIPTION = `The Earth Action Initiative will organize a variety of
                        events and actions that build community, leverage existing
                        efforts, inspire new plans, and find innovative ways to
                        execute these actions through effective communication.`

function amountToDollarString(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ConditionalProposalRender(isAdmin) {
  if (isAdmin) {
    return (
      <div className='progressBarsFrame'>
        <ProgressBar className='progressBarPercentVoted' variant='info' now={PERCENT_VOTED} label={`${PERCENT_VOTED}% Voted`}/>
        <ProgressBar className='progressBarPercentYes' variant='success' now={PERCENT_YES} label={`${PERCENT_YES}% YES`}/>
      </div>);
  } else {
    return <div>voting buttons</div>;
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
          </div>
        </div>
        <div className="discussion">
          discussion
        </div>
      </div>
    );
  }

  export default ProposalDetails;