import './ProposalManagement.css';
import PopUpModal from '../../components/popupModal/PopUpModal';

function ProposalManagement() { 
    return (
        <PopUpModal warning="Are you sure you want to delete these proposals?"
                    secondaryText="cancel"
                    primaryText="delete"
                    />
    );
}

export default ProposalManagement;