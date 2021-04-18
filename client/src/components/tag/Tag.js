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
  let tagClassName = props.privileges + " tag";

  return (
      <div className={tagClassName}>{props.privileges}</div>
  )
}

export default Tag;