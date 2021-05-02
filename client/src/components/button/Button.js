import ProposalDetails from '../../pages/proposalDetails/ProposalDetails';
import './Button.css';

function Button(props) { 
    return (
        <div className="button">
            <Button style={{ color: props.innerColor, 
                             border: props.borderColor,
                             width: props.width,
                             height: props.height,
                             }}>{props.text}</Button>
        </div>
    );
}

export default Button;