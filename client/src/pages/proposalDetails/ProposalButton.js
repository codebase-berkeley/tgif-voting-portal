import './ProposalButton.css';

function ProposalButton({buttonText, isVotingButton, buttonClassName, onClickFunc}) {
  if (isVotingButton) {
    return (
      <div>
        <button className={buttonClassName} onClick={onClickFunc}>
          {buttonText}
        </button>
      </div>
    );
  } else {
    return (
      <button className="genericProposalButton">
          {buttonText}
      </button>
    );
  }
}

export default ProposalButton;