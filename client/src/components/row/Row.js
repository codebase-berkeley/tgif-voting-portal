import './Row.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import React from "react";

function Row(props) { 
    if (props.mode && props.isManagement) {
        return rowDeletionMode(props);
    } else if (!props.isManagement) {
        return rowDashboardMode(props);
    } else {
        return rowDefaultMode(props);
    }
}

function rowDeletionMode(props) {
    return (
        <div
            className="proposal-box"
            id={props.title}
        >
            <div className="whole-row">
                <div className="leftRow">
                    <input className='proposalsCheckbox' type="checkbox" onClick={props.proposalCheckboxOnClick}/>
                </div>
                <div className="rightRow">
                    <div className="proposal-title">{props.title}</div>
                </div>
            </div>
        </div>
    );
}

function rowDashboardMode(props) {
    const boolean = props.voteStatus;
    if (boolean) {
        return (
            <div
                className="proposal-box"
                id={props.title}
                onClick={() => {props.changeTitle(props.title);
                                props.changeDescription(props.description);
                                props.changeWantedPropID(props.id);
                                props.changeTextBoxValue();
                                props.changeVoteButton();}
            }>
            
                <div className="proposal-title">{props.title}</div>
                <img src={yesIcon} alt='Vote Status' className="vote-status"></img>
    
            </div>
            
        );
    } else if (boolean == null) {
        return (
            <div
                className="proposal-box"
                id={props.title}
                onClick={() => {props.changeTitle(props.title);
                                props.changeDescription(props.description);
                                props.changeWantedPropID(props.id);
                                props.changeTextBoxValue();
                                props.changeVoteButton()}
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
                                props.changeTextBoxValue()}
            }>
            
                <div className="proposal-title">{props.title}</div>
                <img src={noIcon} alt='Vote Status' className="vote-status"></img>
    
            </div>
        );
    }
}

function rowDefaultMode(props) {
    return (
        <div
            className="proposal-box"
            id={props.title}
        >
            <div className="proposal-title">{props.title}</div>
        </div>
        
    );
}


export default Row;