import './Row.css';

function Row(props) { 
    console.log(props.change);
    console.log(props.title);
    return (
        <div
            className="proposal-box"
            id={props.title}
            onClick={() => {props.changeTitle(props.title);
                            props.changeDescription(props.title);}
        }>

            <div className="proposal-title">{props.title}</div>
            <img src={props.vote} className="vote-status"></img>
        </div>
    );
}

export default Row;