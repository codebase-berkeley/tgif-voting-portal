import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import TableRow from '../../components/tableRow/TableRow.js';
import addMemberIcon from '../../assets/add.svg';
import removeMemberIcon from '../../assets/trashCan.svg';
import enterEditingIcon from '../../assets/edit.svg';
import exitEditingIcon from '../../assets/checkmark.svg';
import PopUpModal from '../../components/popupModal/PopUpModal.js'
import './Members.css';

function Members(props) {

  const PRIVILEGES = props.privileges;

  const memberNameTextboxRef = useRef();
  const memberEmailTextboxRef = useRef();
  const memberRoleTextboxRef = useRef();
  const privilegesDropdownRef = useRef();
  const selectAllCheckboxRef = useRef();

  const [editingMode, setEditingMode] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

	const [numOfProposals, setNumOfProposals] = useState();
  const [members, setMembers] = useState([]);


  /* REACT STATES FOR EDIT/ADD/REMOVE BUTTONS */
  const addIconDefault = 'addMemberIconContainer';
  const removeIconDefault = 'removeMembersIconContainer';
  const enterEditingIconDefault = 'enterEditingIconContainer';
  const exitEditingIconDefault = 'exitEditingIconContainer';

  const [addIconClassName, setAddIconClassName] = useState(addIconDefault + ' hide');
  const [removeIconClassName, setRemoveIconClassName] = useState(removeIconDefault + ' hide');
  const [enterEditingIconClassName, setEnterEditingIconClassName] = useState(enterEditingIconDefault);
  const [exitEditingIconClassName, setExitEditingIconClassName] = useState(exitEditingIconDefault + ' hide');

  async function fetchMembers() {
		const response = await axios.get('http://localhost:8000/getMembers');
		const userCounts = await axios.get('http://localhost:8000/getUserVotes');
		const totalProposals = await axios.get('http://localhost:8000/getProposalCount');
		let users = response.data;
    /* Add a <count> attribute to each user that reflects the # of
    proposals they have voted on */
		userCounts.data.forEach(user => {
			users[user.user_id - 1].count = user.count;
		});
    /* Initialize false <checked> attributes for each user; used for checkbox tracking
    while in editing mode */
    users.forEach(user => {
      user.checked = false;
    })
		setNumOfProposals(totalProposals.data);
		setMembers(users);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  /** Handles clicking the pencil icon to start editing members */
  function enterEditingMode() {
    const copyArray = [...members];
    copyArray.forEach((member) => {
      member.checked = false;
    });
    setMembers(copyArray);
    setAddIconClassName(addIconDefault);
    setRemoveIconClassName(removeIconDefault);
    setEnterEditingIconClassName(enterEditingIconDefault + ' hide');
    setExitEditingIconClassName(exitEditingIconDefault);
    setEditingMode(true);
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
    setIsAddingMember(!isAddingMember);
  }

  async function confirmAddMember() {
    const nameTextbox = memberNameTextboxRef.current;
    const emailTextbox = memberEmailTextboxRef.current;
    const roleTextbox = memberRoleTextboxRef.current;
    const privilegesDropdown = privilegesDropdownRef.current;

    if (nameTextbox.value !== '' && emailTextbox.value !== ''
        && roleTextbox.value !== '' && privilegesDropdown !== ''
        && PRIVILEGES === 'Admin') {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8000/addUser',
          data: {
            privileges: privilegesDropdown.value,
            username: nameTextbox.value,
            email: emailTextbox.value,
            role: roleTextbox.value
          }
        });
      } catch(error) {
          console.log(error);
      }
      fetchMembers();
      setIsAddingMember(false);
    }
  }

  const [removeModal, setRemoveModal] = useState(null);

  function handleRemove() {
    /* Go through each checkbox and determine which users were selected */
    const userIdsToDelete = [];
    members.forEach((member) => {
      if (member.checked) {
        userIdsToDelete.push(member.id);
      }
    })
    const numSelected = userIdsToDelete.length;

    async function removeMembers() {
      if (PRIVILEGES === 'Admin') {
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

    if (numSelected > 0) {
      let pluralOrSingular = (numSelected > 1) ? 'members' : 'member';
      setRemoveModal(
        <PopUpModal
          warning={`Are you sure you want to remove ${numSelected} ${pluralOrSingular}?`}
          primaryText='remove'
          secondaryText='cancel'
          primaryFunc={() => {removeMembers(); setRemoveModal(null);}}
          secondaryFunc={() => setRemoveModal(null)}
        />
      )
    }
  }

  /** Handles clicking the Select All checkbox */
  function selectAllCheckbox() {
    const selectAllCb = selectAllCheckboxRef.current;
    const copyArray = [...members];
    copyArray.forEach((member) => {
      member.checked = selectAllCb.checked;
    });
    setMembers(copyArray);
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

  if (PRIVILEGES === 'Admin') {
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
            title='Remove Selected Members' onClick={handleRemove}/>
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
                    <input ref={selectAllCheckboxRef} className='selectAllCheckbox' type="checkbox" onClick={selectAllCheckbox}/>
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
                name={(<input ref={memberNameTextboxRef} className='addMemberTextbox' type='text' placeholder='name'/>)}
                email={(<input ref={memberEmailTextboxRef} className='addMemberTextbox' type='text' placeholder='email'/>)}
                role={(<input ref={memberRoleTextboxRef} className='addMemberTextbox' type='text' placeholder='role'/>)}
                privileges={(<select ref={privilegesDropdownRef}>
                  <option value='Admin'>Admin</option>
                  <option value='Voting Member'>Voting Member</option>
                  <option value='Non-Voting Member'>Non-Voting Member</option>
                </select>)}
                votes={'0/' + numOfProposals}
                addingMode={true}
                handleSubmitFunc={confirmAddMember}/>) : null}
                {members.map((member) => {
                  return (<TableRow
										name={member.username}
										email={member.email}
										role={member.tgif_role}
										privileges={member.privileges}
										votes={(member.count == null ? 0 : member.count) + "/" + numOfProposals}
                    editingMode = {editingMode}
                    checkboxOnClick = {() => {
                                              const copyArray = [...members];
                                              copyArray.forEach((copyMember) => {
                                                if (copyMember.id === member.id) {
                                                  copyMember.checked = !copyMember.checked;
                                                }
                                              });
                                              setMembers(copyArray);
                                              updateSelectAllCheckbox();
                                              }}
                    isChecked={member.checked}
									/>)
								})}
              </tbody>
            </table>
          </div>
        </div>
        {removeModal}
      </div>
    );
  } else {
    return(
      <div>
        You do not have permission to view this page. Contact a portal admin if you believe this is a mistake.
      </div>
    )
  }
}

export default Members;