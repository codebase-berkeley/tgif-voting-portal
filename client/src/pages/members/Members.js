import {useEffect, useState} from 'react';
import axios from "axios";
import TableRow from '../../components/tableRow/TableRow.js';
import {Edit2} from 'react-feather/';
import addMemberIcon from '../../assets/add.svg';
import removeMemberIcon from '../../assets/trashCan.svg';
import enterEditingIcon from '../../assets/edit.svg';
import exitEditingIcon from '../../assets/checkmark.svg';
import './Members.css';

function Members() {
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
      var nameTextbox = document.getElementById('addMemberNameTB');
      var emailTextbox = document.getElementById('addMemberEmailTB');
      var roleTextbox = document.getElementById('addMemberRoleTB');
      var privilegeDropdown = document.getElementById('privilegeDropdown');

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

  async function removeMember() {
    //Go through each checkbox and determine which users should be deleted
    var userIdsToDelete = [];
    members.forEach((member) => {
      var id = member.id;
      var checkbox = document.getElementById('checkbox' + id);
      if (checkbox !== null && checkbox.checked) {
        userIdsToDelete.push(id);
      }
    })
    //Make backend DELETE request
    if (userIdsToDelete != null && userIdsToDelete.length > 0) {
      try {
        const response = await axios({
          method: 'delete',
          url: 'http://localhost:8000/deleteUser',
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

  async function fetchMembers() {
		const response = await axios.get('http://localhost:8000/getMembers');
		const userCounts = await axios.get('http://localhost:8000/getUserVotes');
		const totalProposals = await axios.get('http://localhost:8000/getProposalCount');
		let users = response.data;
		userCounts.data.forEach(user => {
			users[user.user_id - 1].count = user.count;
		});
		setProposals(totalProposals.data);
		setMembers(users);
    console.log(typeof members, members);
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
            title='Remove Selected Members' onClick={removeMember}/>
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
                  {editingMode ? (<th className='tableHeaderCell'>Select</th>) : null}
                  <th className='tableHeaderCell'>Member Name</th>
                  <th className='tableHeaderCell'>Email</th>
                  <th className='tableHeaderCell'>Role</th>
                  <th className='tableHeaderCell'>Privileges</th>
                  <th className='tableHeaderCell'>Votes Submitted</th>
                </tr>
              </thead>
              <tbody>
                {isAddingMember ? (<TableRow
                name={(<input id='addMemberNameTB' className='addMemberTextbox' type='text' placeholder='name'/>)}
                email={(<input id='addMemberEmailTB' className='addMemberTextbox' type='text' placeholder='email'/>)}
                role={(<input id='addMemberRoleTB' className='addMemberTextbox' type='text' placeholder='role'/>)}
                privilege={(<select id='privilegeDropdown'>
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
                    checkboxId = {"checkbox" + member.id}
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