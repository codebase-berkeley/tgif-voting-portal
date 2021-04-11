import './Row.css';



function Row(props) { 
    
    if (props.displayX) {
        return doDisplayX(props);
    } else {
        return dontDisplayX(props);
    }
}

function doDisplayX(props) {
    return (
        <div
            className="proposal-box"
            id={props.title}
            onClick={() => {props.changeTitle(props.title);
                            props.changeDescription(props.description);}
        }>
            <div className="whole-row">
                <div className="leftRow">
                    <img src={props.x} className="x-box"></img>
                </div>
                <div className="rightRow">
                    <div className="proposal-title">{props.title}</div>
                    <img src={props.vote} className="vote-status"></img>
                </div>
            </div>
        </div>
    );
}

function dontDisplayX(props) {
    return (
        <div
            className="proposal-box"
            id={props.title}
            onClick={() => {props.changeTitle(props.title);
                            props.changeDescription(props.description);}
        }>
        
            <div className="proposal-title">{props.title}</div>
            <img src={props.vote} className="vote-status"></img>

        </div>
        
    );
}

export default Row;