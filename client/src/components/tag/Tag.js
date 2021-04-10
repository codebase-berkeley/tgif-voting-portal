import './Tag.css'
import React from "react";

function Tag(props) {
  let classes = props.privilege + " tag";
  return (
      <div className={classes}>{props.privilege}</div>
  )
}

export default Tag;