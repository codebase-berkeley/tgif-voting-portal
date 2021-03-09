import './Row.css';

function Row(props) { 
    return (
        <div className="proposal-box" id={props.title}>
            <div className="proposal-title">{props.title}</div>
            <div className="vote-status">{props.vote}</div>
        </div>
    );
}

export default Row;