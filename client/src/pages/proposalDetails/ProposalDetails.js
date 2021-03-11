import './ProposalDetails.css';
import ProgressBarDummy from './ProgressBar.js';
import ProgressBar from 'react-bootstrap/ProgressBar'

var IS_ADMIN = true;
var DEADLINE = '3/5/21';
var AMOUNT = 3245356;
var PERCENT_VOTED = 60;
var PERCENT_YES = 20;

function ConditionalProposalRender(isAdmin) {
  if (isAdmin) {
    return (
      <div className='progressBarVoted progressBar'>
        <ProgressBar now={PERCENT_VOTED} label={`${PERCENT_VOTED}% Voted`}/>
        <ProgressBar now={PERCENT_YES} label={`${PERCENT_YES}% YES`}/>
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
              Proposal Title Frame 
              {/* <hr className="underline"></hr> */}
            </div>
            <div className="proposalSponsor">Proposal Sponsor </div>
            <div className="proposalDescription">proposal description </div>
            <div className="proposalAmount"> proposal amount: {AMOUNT}</div>
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