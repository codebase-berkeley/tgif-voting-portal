import './ProposalButton.css';

function ProposalButton({buttonText, buttonClassName, onClickFunc, hoverText}) {
    return (
      <button className={buttonClassName} onClick={onClickFunc} title={hoverText}>
        {buttonText}
      </button>
    );
}

export default ProposalButton;