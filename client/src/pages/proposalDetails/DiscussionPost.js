import './DiscussionPost.css';

function ConditionalUserNameRender(isAdmin, userName, isHighlighted) {
  if (isAdmin) {
    return (
      <div>
        {userName}
      </div>);
  } else if (isHighlighted) {
      return (
        <div>
          Anon User (You)
        </div>)
  } else {
    return <div>Anon User</div>;
  }
}

function ConditionalUserDisplay(isHighlighted) {
  //console.log(userID);
  if (isHighlighted) {
    return "text-highlighted";
  }
  return "text";
}

function DiscussionPost(props) {
  return (
    <div className="post">
      <div className="user">
        {ConditionalUserNameRender(props.isAdmin, props.userName, props.isHighlighted)}
      </div>
      <div className={ConditionalUserDisplay(props.isHighlighted)}>
        <div className="content">
          {props.text}
        </div>
        <div className='timestampContainer'>
          <div className="timestamp">
            posted: {props.time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPost;