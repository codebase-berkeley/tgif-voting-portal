import './TableRow.css';
import Tag from '../tag/Tag';
import checkmarkIcon from '../../assets/checkmark.svg';
import React from "react";

function TableRow(props) {
  let confirmAddMember = <input className='confirmAddMemberButton membersButton' type="image"
                          src={checkmarkIcon} alt='Confirm Add Member Icon'
                          title='Confirm Member' onClick={props.handleSubmitFunc}/>;

  return (
    <React.Fragment>
      <tr className="member-row">
        {props.addingMode ? (confirmAddMember) : (props.editingMode ? (<input id={props.checkboxId} type="checkbox"/>) : null)}
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.role}</td>
        <td className="tags">
          <Tag privilege={props.privilege} text={props.privilege}/>
        </td>
        <td>{props.votes}</td>
      </tr>
    </React.Fragment>
  );
}

export default TableRow;