import './Tag.css'
import React from "react";

function Tag(props) {
  /**
   * Options for Member Tags:
   * ========================
   * - Admin
   * - Voting Member
   * - Non-Voting Member
   */
  let classes = props.privilege + " tag";

  return (
      <div className={classes}>{props.privilege}</div>
  )
}

export default Tag;