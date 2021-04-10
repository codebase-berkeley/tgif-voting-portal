import {useEffect, useState} from 'react';
import axios from "axios";
import TableRow from '../../components/tableRow/TableRow.js';
import {Edit2} from 'react-feather/';
import './Members.css';

function Members() {

	const [proposals, setProposals] = useState();
  const [members, setMembers] = useState([]);

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
		console.log(members)
  }

    useEffect(() => {
      fetchMembers();
    }, []);
    
    return (
      <div className="members-page">
        <div className="membersHeader">
          Members
          <hr className="membersUnderline"></hr>
          <div className='editMembersIcon'>
            <Edit2 size={45}/>
          </div>
        </div>
        <div className="membersBottomContainer">
          <div className="membersTableContainer">
            <table id="membersTable">
              <thead className='tableHeaderRow'>
                <tr>
                  <td >Member Name</td>
                  <td>Email</td>
                  <td>Role</td>
                  <td>Privileges</td>
                  <td>Votes Submitted</td>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  return (<TableRow
										name={member.username}
										email={"email.joe"}
										role={"joe"}
										privilege={member.is_admin ? "Admin" : "TGIF Committee"}
										votes={(member.count == null ? 0 : member.count) + "/" + proposals}
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