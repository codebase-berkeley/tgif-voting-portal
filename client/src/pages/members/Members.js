import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import TableRow from '../../components/tableRow/TableRow.js';
import addMemberIcon from '../../assets/add.svg';
import removeMemberIcon from '../../assets/trashCan.svg';
import enterEditingIcon from '../../assets/edit.svg';
import exitEditingIcon from '../../assets/checkmark.svg';
import './Members.css';

function Members() {
  const memberNameRef = useRef(null);
  const memberEmailRef = useRef(null);
  const memberRoleRef = useRef(null);
  const privilegeDropdownRef = useRef(null);
  const selectAllCheckboxRef = useRef(null);

  const [editingMode, setEditingMode] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

	const [proposals, setProposals] = useState();
  const [members, setMembers] = useState([]);


  /* REACT STATES FOR EDIT/ADD/REMOVE BUTTONS */
  var addIconDefault = 'addMemberIconContainer';
  var removeIconDefault = 'removeMembersIconContainer';
  var enterEditingIconDefault = 'enterEditingIconContainer';
  var exitEditingIconDefault = 'exitEditingIconContainer';

  const [addIconClassName, setAddIconClassName] = useState(addIconDefault + ' hide');
  const [removeIconClassName, setRemoveIconClassName] = useState(removeIconDefault + ' hide');
  const [enterEditingIconClassName, setEnterEditingIconClassName] = useState(enterEditingIconDefault);
  const [exitEditingIconClassName, setExitEditingIconClassName] = useState(exitEditingIconDefault + ' hide');

  /** Handles clicking the pencil icon to start editing members */
  function enterEditingMode() {
    setAddIconClassName(addIconDefault);
    setRemoveIconClassName(removeIconDefault);
    setEnterEditingIconClassName(enterEditingIconDefault + ' hide');
    setExitEditingIconClassName(exitEditingIconDefault);
    setEditingMode(true);
    console.log(typeof members, "members: ", members);
  }

  /** Handles clicking the checkmark icon to exit member editing mode */
  function exitEditingMode() {
    setAddIconClassName(addIconDefault + ' hide');
    setRemoveIconClassName(removeIconDefault + ' hide');
    setEnterEditingIconClassName(enterEditingIconDefault);
    setExitEditingIconClassName(exitEditingIconDefault + ' hide');
    setEditingMode(false);
    setIsAddingMember(false);
  }

  /** Handles clicking the plus icon to add a new member */
  function addMember() {
    if (!isAddingMember) {
      setIsAddingMember(true);
    } else {
      confirmAddMember();
    }
  }

  async function confirmAddMember() {
      const nameTextbox = memberNameRef.current.value;
      const emailTextbox = memberEmailRef.current.value;
      const roleTextbox = memberRoleRef.current.value;
      const privilegeDropdown = privilegeDropdownRef.current.value;

      if (nameTextbox.value !== '' && emailTextbox.value !== ''
          && roleTextbox.value !== '' && privilegeDropdown !== '') {
        try {
          const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/addUser',
            data: {
              isAdmin: (privilegeDropdown.value === 'Admin' ? true : false),
              username: nameTextbox.value
            }
          });
          console.log(response);
        } catch(error) {
            console.log(error);
        }
        fetchMembers();
        setIsAddingMember(false);
      }
  }

  async function removeMembers() {
    //Go through each checkbox and determine which users should be deleted
    const userIdsToDelete = [];
    members.forEach((member) => {
      if (member.checked) {
        userIdsToDelete.push(member.id);
      }
    })
    //Make backend DELETE request
    if (userIdsToDelete != null && userIdsToDelete.length > 0) {
      try {
        await axios({
          method: 'delete',
          url: 'http://localhost:8000/deleteUsers',
          data: {
            listOfIds: userIdsToDelete
          }
        });
      } catch(error) {
          console.log(error);
      }
      fetchMembers();
    }
  }

  /** Handles clicking the Select All checkbox */
  function selectAllCheckbox() {
    const selectAllCb = selectAllCheckboxRef.current;
    console.log("Select All: ", selectAllCb.checked);
    const newArr = [...members]; // make a copy of the original state (copy all members into list)
    newArr.forEach((member) => {
      member.checked = selectAllCb.checked;   // edit values in the new array
    });
    setMembers(newArr); // set state to the new array
  }

  /** Updates the Select All checkbox to reflect whether all checkboxes are checked or not.
   * Called any time a checkbox is clicked. */
  function updateSelectAllCheckbox() {
    const selectAllCb = selectAllCheckboxRef.current;
    let amountChecked = 0;
    members.forEach((member) => {
      if (member.checked) {
        amountChecked += 1;
      }
    });
    if (amountChecked < members.length) {
      selectAllCb.checked = false;
    } else if (amountChecked === members.length) {
      selectAllCb.checked = true;
    }
  }

  async function fetchMembers() {
		const response = await axios.get('http://localhost:8000/getMembers');
		const userCounts = await axios.get('http://localhost:8000/getUserVotes');
		const totalProposals = await axios.get('http://localhost:8000/getProposalCount');
		let users = response.data;
		userCounts.data.forEach(user => {
			users[user.user_id - 1].count = user.count;
		});
    users.forEach(user => {
      user.checked = false;
    })
		setProposals(totalProposals.data);
		setMembers(users);
    // console.log(typeof members, "members: ", members);
  }

  useEffect(() => {
    fetchMembers();
  }, []);
    
    return (
      <div className="members-page">
        <div className="membersHeader">
          Members
          <hr className="membersUnderline"></hr>
          <div className={addIconClassName}>
            <input className='addMemberButton membersButton' type="image" src={addMemberIcon} alt='Add Icon'
            title='Add Member' onClick={addMember}/>
          </div>
          <div className={removeIconClassName}>
            <input className='removeMembersButton membersButton' type="image" src={removeMemberIcon} alt='Remove Icon'
            title='Remove Selected Members' onClick={removeMembers}/>
          </div>
          <div className={enterEditingIconClassName}>
            <input className='enterEditingButton membersButton' type="image" src={enterEditingIcon} alt='Enter Editing Icon'
            title='Edit Members' onClick={enterEditingMode}/>
          </div>
          <div className={exitEditingIconClassName}>
            <input className='exitEditingButton membersButton' type="image" src={exitEditingIcon} alt='Exit Editing Icon'
            title='Finish Editing' onClick={exitEditingMode}/>
          </div>
        </div>
        <div className="membersBottomContainer">
          <div className="membersTableContainer">
            <table className="membersTable">
              <thead className='tableHeader'>
                <tr>
                  {editingMode ? (<th className='tableHeaderCell'>
                    Select All
                    <input ref={selectAllCheckboxRef} className='selectAllCheckbox' id='selectAllCheckbox' type="checkbox" onClick={selectAllCheckbox}/>
                  </th> ) : null}
                  <th className='tableHeaderCell'>Member Name</th>
                  <th className='tableHeaderCell'>Email</th>
                  <th className='tableHeaderCell'>Role</th>
                  <th className='tableHeaderCell'>Privileges</th>
                  <th className='tableHeaderCell'>Votes Submitted</th>
                </tr>
              </thead>
              <tbody>
                {isAddingMember ? (<TableRow
                name={(<input ref={memberNameRef} id='addMemberNameTB' className='addMemberTextbox' type='text' placeholder='name'/>)}
                email={(<input ref={memberEmailRef} id='addMemberEmailTB' className='addMemberTextbox' type='text' placeholder='email'/>)}
                role={(<input ref={memberRoleRef} id='addMemberRoleTB' className='addMemberTextbox' type='text' placeholder='role'/>)}
                privilege={(<select  ref={privilegeDropdownRef} id='privilegeDropdown'>
                  <option value='Admin'>Admin</option>
                  <option value='Voting Member'>Voting Member</option>
                  <option value='Non-Voting Member'>Non-Voting Member</option>
                </select>)}
                votes={'0/' + proposals}
                addingMode={true}
                handleSubmitFunc={confirmAddMember}/>) : null}
                {members.map((member) => {
                  return (<TableRow
										name={member.username}
										email={"email@berkeley.edu"}
										role={"ASUC Representative"}
										privilege={member.is_admin ? "Admin" : "Voting Member"}
										votes={(member.count == null ? 0 : member.count) + "/" + proposals}
                    editingMode = {editingMode}
                    checkboxOnClick = {() => {  member.checked = !member.checked;
                                                updateSelectAllCheckbox();
                                                console.log("Checkbox for ", member.username, "is checked: ", member.checked)}}
                    isChecked={member.checked}
									/>)
								})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Members;