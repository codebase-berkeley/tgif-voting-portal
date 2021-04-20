import './Row.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

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
                    <input className='proposalsCheckbox' type="checkbox" checked={props.isChecked} onClick={props.proposalCheckboxOnClick}/>
                </div>
                <div className="rightRow">
                    <div className="proposal-title">{props.title}</div>
                    <img src={props.vote} className="vote-status"></img>
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
                            props.changeWantedPropID(props.id);}
        }>
        
            <div className="proposal-title">{props.title}</div>
            <img src={props.vote} className="vote-status"></img>

        </div>
        
    );
}

function rowDefaultMode(props) {
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



export default Row;