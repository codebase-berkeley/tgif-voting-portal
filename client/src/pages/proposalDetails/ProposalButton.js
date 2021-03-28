import './ProposalButton.css';

function ProposalButton(props) {
    return (
      <button className="proposalButton">
          {props.buttonText}
      </button>
    );
  }

export default ProposalButton;