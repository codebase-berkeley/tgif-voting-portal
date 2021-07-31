import './Row.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import React from "react";

/* Used in Proposal Management page when not in editing mode. */
function rowDefaultMode(props) {
    return (
        <div
            className="proposal-box management-page-box"
            id={props.title}
        >
            <div className="proposal-title">{props.title}</div>
        </div>       
    );
}

/* Used in Dashboard page. Accounts for all 3 cases: Voted No (X icon), Voted Yes (checkmark icon),
and have not voted on this proposal (no icon). */
function rowDashboardMode(props) {
    const proposalVote = props.voteStatus;
    if (proposalVote) {
        return (
            <div
                className="proposal-box"
                id={props.title}
                onClick={() => {props.changeTitle(props.title);
                                props.changeDescription(props.description);
                                props.changeWantedPropID(props.id);
                                props.changeTextBoxValue();
                                props.changeVoteButton(props.id);}
            }>
            
                <div className="proposal-title">{props.title}</div>
                <img src={yesIcon} alt='Vote Status' className="vote-status"></img>
    
            </div>
            
        );
    } else if (proposalVote == null) {
        return (
            <div
                className="proposal-box"
                id={props.title}
                onClick={() => {props.changeTitle(props.title);
                                props.changeDescription(props.description);
                                props.changeWantedPropID(props.id);
                                props.changeTextBoxValue();
                                props.changeVoteButton(props.id)}
            }>
            
                <div className="proposal-title">{props.title}</div>
    
            </div>
            
        );
    } else {
        return (
            <div
                className="proposal-box"
                id={props.title}
                onClick={() => {props.changeTitle(props.title);
                                props.changeDescription(props.description);
                                props.changeWantedPropID(props.id);
                                props.changeTextBoxValue();
                                props.changeVoteButton(props.id);}
            }>
            
                <div className="proposal-title">{props.title}</div>
                <img src={noIcon} alt='Vote Status' className="vote-status"></img>
    
            </div>
        );
    }
}

/* Used in Proposal Management page when in editing mode. */
function rowDeletionMode(props) {
    return (
        <div
            className="proposal-box management-page-box"
            id={props.title}
        >
            <div className="whole-row">
                <div className="leftRow">
                    <input className='proposalsCheckbox' type="checkbox" checked={props.isChecked} onClick={props.proposalCheckboxOnClick}/>
                </div>
                <div className="rightRow">
                    <div className="proposal-title">{props.title}</div>
                </div>
            </div>
        </div>
    );
}

function Row(props) { 
    if (props.mode && props.isManagement) {
        return rowDeletionMode(props);
    } else if (!props.isManagement) {
        return rowDashboardMode(props);
    } else {
        return rowDefaultMode(props);
    }
}

export default Row;