import './TableRow.css';
import Tag from '../tag/Tag';
import ProposalButton from '../../pages/proposalDetails/ProposalButton.js'
import React from "react";

function TableRow( { handleSubmitFunc, addingMode, editingMode, isChecked, checkboxOnClick, name, email, role, privilege, votes } ) {
  let confirmAddMemberButton = <td> 
                          <ProposalButton className='confirmAddMemberButton membersButton' hoverText='Confirm Member'
                          buttonText='Confirm' buttonClassName='confirmMemberButton' onClickFunc={handleSubmitFunc}/>
                          </td>

  return (
    <React.Fragment>
      <tr className="member-row">
        {addingMode ? (confirmAddMemberButton) : (editingMode ? (<td> <input className='membersCheckbox' type="checkbox" checked={isChecked} onClick={checkboxOnClick}/> </td>) : null)}
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td className="tags">
          <Tag privilege={privilege} text={privilege}/>
        </td>
        <td>{votes}</td>
      </tr>
    </React.Fragment>
  );
}

export default TableRow;