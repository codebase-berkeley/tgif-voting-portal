import {useEffect, useState} from 'react';
import axios from "axios";
import TableRow from '../../components/tableRow/TableRow.js';
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
            editIcon
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
										role={member.is_admin ? "Admin" : "Committee Member"}
										privilege={"joe"}
										votes={(member.count == null ? 0 : member.count) + "/" + proposals}
									/>)
								})}
                <tr>
                  <td>Jill Smith</td>
                  <td>Smith@Smith.com</td>
                  <td>Head Karen</td>
                  <td>Admin</td>
                  <td>20/30</td>
                </tr>
                <tr>
                  <td>Eve Jackson</td>
                  <td>Jackson@enterprise.com</td>
                  <td>Spy, nosy a**hole</td>
                  <td>Owner</td>
                  <td>3/30</td>
                </tr>
                <tr>
                  <td>Someone Someone</td>
                  <td>someone@somewhere.edu</td>
                  <td>Lost in Life</td>
                  <td>Admin</td>
                  <td>30/30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Members;