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
                    <img src={props.vote} alt='Vote Status' className="vote-status"></img>
                </div>
            </div>
        </div>
    );
}

function rowDashboardMode(props) {
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
            <img src={props.vote} alt='Vote Status' className="vote-status"></img>

        </div>
        
    );
}

function rowDefaultMode(props) {
    const boolean = props.voted;
    return (
        <div
            className="proposal-box"
            id={props.title}
        >
            <div className="proposal-title">{props.title}</div>
            <img src={props.vote} className="vote-status"></img>

        </div>
        
    );
}

function votedYesOrNo(props) {
    if (props) {
        return <img src={yesIcon} alt='Vote Status' className="vote-status"></img>
    } else {
        return <img src={noIcon} alt='Vote Status' className="vote-status"></img>
    }
}



export default Row;