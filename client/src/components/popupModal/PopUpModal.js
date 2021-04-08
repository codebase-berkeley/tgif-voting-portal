import './PopUpModal.css';

function PopUpModal(props) { 
    return (
    
        <div className="page">
            
            <div className="ourModal">
                <div className="modalText">
                    {props.warning}
                </div>
                <div className="buttons"> 
                    <button className="secondaryButton" onClick={props.secondaryFunc}>
                        {props.secondaryText}
                    </button>
                    <button className="primaryButton" onClick={props.primaryFunc}>
                        {props.primaryText}
                    </button>
                </div>
            </div>
            <div className="overlay2">
            
            </div>
        </div>
    );
}

export default PopUpModal;