import React from "react";

function TableRow(props) {
  return (
    <React.Fragment>
      <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.role}</td>
        <td>{props.priviledge}</td>
        <td>{props.votes}</td>
      </tr>  
    </React.Fragment>
  )
}

export default TableRow;