import './ProposalButton.css';

function ProposalButton({buttonText, buttonClassName, onClickFunc}) {
    return (
      <button className={buttonClassName} onClick={onClickFunc}>
        {buttonText}
      </button>
    );
}

export default ProposalButton;