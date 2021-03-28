import ProposalDetails from '../../pages/proposalDetails/ProposalDetails';
import './Button.css';

function Button(props) { 
    
    // let innerColor = "#FFFFFF";
    // let textColor = "#FFFFFF";
    // let borderColor = '#A6B82E';
    // let w = "95 px";
    // let h = "40 px";

    // if (props.buttonType === voteYes) {
    //     innerColor = '#A6B82E';
    //     w = 120;
    //     h = 50;
    // } else if (props.buttonType === voteNo) {
    //     innerColor = '#353739';
    //     borderColor = '#353739';
    //     w = '120px';
    //     h = 50;
    // } else {
    //     textColor = '#A6B82E';
    // } 

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