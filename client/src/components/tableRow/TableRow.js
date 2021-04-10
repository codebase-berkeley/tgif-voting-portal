import './TableRow.css';
import Tag from '../tag/Tag';
import React from "react";

function TableRow(props) {
  return (
    <React.Fragment>
      <tr className="member-row">
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.role}</td>
        <td className="tags">
          <Tag privilege={props.privilege} text={props.privilege}/>
        </td>
        <td>{props.votes}</td>
      </tr>  
    </React.Fragment>
  )
}

export default TableRow;