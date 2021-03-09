import './ProposalDetails.css';

function ProposalDetails() {
    return (
      <div className="proposalDetailsPage">
        <div className="proposalLeft">
          <div className="proposalSummary">
            <div className="proposalTitle">Proposal Title Frame</div>
            <div className="proposalSponsor">Proposal Sponsor</div>
            <div className="proposalParagraph">proposal paragraph</div>
            <div className="proposalAmount"> proposal amount</div>
            <div className="proposalDeadline"> proposal deadline</div>
          </div>
        </div>
        <div className="discussion">
          discussion
        </div>
      </div>
    );
  }

  export default ProposalDetails;