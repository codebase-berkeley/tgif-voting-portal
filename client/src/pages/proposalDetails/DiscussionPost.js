import './DiscussionPost.css';

function ConditionalUserNameRender(isAdmin, userName) {
  if (isAdmin) {
    return (
      <div>
        {userName}
      </div>);
  } else {
    return <div>Anon User</div>;
  }
}

function ConditionalUserDisplay(userID) {
  console.log(userID);
  if (userID === 2) {
    return "text-highlighted";
  }
  return "text";
}

function DiscussionPost(props) {
  return (
    <div className="post">
      <div className="user">
        {ConditionalUserNameRender(props.isAdmin, props.userName)}
      </div>
      <div className={ConditionalUserDisplay(props.id)}>
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