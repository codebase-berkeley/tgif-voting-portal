import './ProposalManagement.css';
import PopUpModal from '../../components/popupModal/PopUpModal';
import React, { useState, useEffect } from 'react';
import Row from '../../components/row/Row';
import TrashCan from '../../assets/trashCan.svg';

import axios from "axios";
import ProposalButton from '../proposalDetails/ProposalButton';

import enterEditingIcon from '../../assets/edit.svg';
import exitEditingIcon from '../../assets/checkmark.svg';


function ProposalManagement(props) {
  let PRIVILEGES = props.privileges;

  const [proposals, setProposals] = useState([]);
  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/getProposals');
    let proposal_lst = response.data;
    /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
    while in deleting mode */
    proposal_lst.forEach((proposal) => {
      proposal.checked = false;
    })
		setProposals(proposal_lst);
  }

  useEffect(() => {
    fetchProposals();
  }, []);

  const[textboxValueTitle, setTextboxValueTitle] = React.useState('');
  const[textboxValueDescript, setTextboxValueDescript] = React.useState('');
  const[textboxValueLink, setTextboxValueLink] = React.useState('');
  const[textboxValueMoney, setTextboxValueMoney] = React.useState('');

  const [deletingMode, setDeletingMode] = useState(false);

  const [propsIdsToDelete, setPropsIdsToDelete] = useState([]);
    
    /* REACT STATES FOR EDIT BUTTONS */
  const enterEditingIconDefault = 'enterDeletingIconContainer';
  const exitEditingIconDefault = 'exitDeletingIconContainer';
  const deleteIconDefault = 'trashCan';
  const IS_MANAGEMENT = true;

  const [enterEditingIconClassName, setEnterEditingIconClassName] = useState(enterEditingIconDefault);
  const [exitEditingIconClassName, setExitEditingIconClassName] = useState(exitEditingIconDefault + ' hide');
  const [deleteIconClassName, setDeleteIconClassName] = useState(deleteIconDefault + ' hide');
  const [displayModal, setDisplayModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(null);

  /** Handles clicking the pencil icon to start deleting proposals */
  function enterDeletingMode() {
    setEnterEditingIconClassName(enterEditingIconDefault + ' hide');
    setExitEditingIconClassName(exitEditingIconDefault);
    setDeleteIconClassName(deleteIconDefault);
    setDeletingMode(true);
  }

  /** Handles clicking the checkmark icon to exit proposal deleting mode */
  function exitDeletingMode() {
    setEnterEditingIconClassName(enterEditingIconDefault);
    setExitEditingIconClassName(exitEditingIconDefault + ' hide');
    setDeleteIconClassName(deleteIconDefault + ' hide');
    setDeletingMode(false);
    setPropsIdsToDelete([]);
  }

  function displayDeleteProposalsModal() {
    setDisplayModal(true);
  }

    const submitProposal = async () => {
      if (/[!@#$%^&*(),?":{}|<>]/g.test(textboxValueMoney) || /^[A-Z]/.test(textboxValueMoney) || /^[a-z]/.test(textboxValueMoney)) {
        document.getElementById("moneyNewDescription").style.borderColor="#FF0000";
        document.getElementById("moneyNewDescription").style.backgroundColor="#ffcccb";
      } else if (textboxValueTitle !== '' && /^[+-]?\d*(?:[.,]\d*)?$/.test(textboxValueMoney)){
        try {
          await axios({
            method: 'post',
            url: 'http://localhost:8000/submitProposal',
            data: {
              title: textboxValueTitle,
              amount_requested: (isNaN(parseFloat(textboxValueMoney)) ? 0 : parseFloat(textboxValueMoney)),
              link: textboxValueLink,
              description_text: textboxValueDescript
            }
          });
          fetchProposals();
      } catch(error) {
        console.log("There was an error in submitting your proposal.");
        console.log(error.stack); 
      }
      setTextboxValueTitle('');
      setTextboxValueDescript('');
      setTextboxValueLink('');
      setTextboxValueMoney(''); 
      document.getElementById("moneyNewDescription").style.borderColor= '#757575';
      document.getElementById("moneyNewDescription").style.backgroundColor="white";
      document.getElementById("titleNewProposal").style.borderColor="#757575";
      document.getElementById("titleNewProposal").style.backgroundColor="white";
    } else {
      document.getElementById("titleNewProposal").style.borderColor="#FF0000";
      document.getElementById("titleNewProposal").style.backgroundColor="#ffcccb";
    }
  };

  function handleRemoveProposals() {
    const numSelected = propsIdsToDelete.length;

    async function removeProposals() {
    
      /* Make backend DELETE request */
      if (propsIdsToDelete != null && propsIdsToDelete.length > 0) {
        try {
          await axios({
            method: 'delete',
            url: 'http://localhost:8000/delete_proposal',
            data: {
              listOfIDs: propsIdsToDelete
            }
          });
        } catch(error) {
            console.log(error);
        }
        fetchProposals();
      }
    }
    if (numSelected > 0) {
      let pluralOrSingular = (numSelected > 1) ? 'proposals' : 'proposal';
      setRemoveModal(
        <PopUpModal
          warning={`Are you sure you want to delete ${numSelected} ${pluralOrSingular}?`}
          primaryText='remove'
          secondaryText='cancel'
          primaryFunc={() => {removeProposals(); setRemoveModal(null);}}
          secondaryFunc={() => setRemoveModal(null)}
        />
        )
    }
  }

  function updateProposalDeleteIDs(proposal) {
    const updatedPropsIdsToDelete = [...propsIdsToDelete];
    if (proposal.checked) {
      updatedPropsIdsToDelete.pop(proposal.id);
    } 
    else {
      updatedPropsIdsToDelete.push(proposal.id);
    }
    proposal.checked =  !proposal.checked;
    setPropsIdsToDelete(updatedPropsIdsToDelete);
  }
  
    if (PRIVILEGES === 'Admin') {
      return (
        <div className = "ProposalManagementOuter">
              <div className="proposalManagement">
              <div className="proposalManagementLeft"> 
                <div className="icons">
                  <div className={enterEditingIconClassName}>
                    <input className='enterDeletingIconContainer proposalsButton' type="image" src={enterEditingIcon} alt='Enter Deleting Mode'
                    title='Edit Members' onClick={enterDeletingMode}/>
                  </div>
                  <div className={exitEditingIconClassName}>
                    <input className='exitDeletingIconContainer proposalsButton' type="image" src={exitEditingIcon} alt='Exit Deleting Mode'
                    title='Finish Editing' onClick={exitDeletingMode}/>
                  </div>
                  <div className={deleteIconClassName}>   
                            <input className='removeProposalsButton proposalsButton' type="image" src={TrashCan} alt='Delete Selected Proposals'
                            title='Remove Selected Proposals' onClick={handleRemoveProposals}/>
                  </div>
                </div>
                  <div className="proposal-list">
                      {proposals.map((proposal) => (
                          <Row 
                            title={proposal.title} 
                            description={proposal.description}
                            mode={deletingMode}
                            isManagement= {IS_MANAGEMENT}
                            vote={proposal.voted ? proposal.voted : ""}
                            proposalCheckboxOnClick = {() => {updateProposalDeleteIDs(proposal);}}
                              isChecked={proposal.checked}
                            />
                      ))}
                  </div>
              </div>
            </div>
        
            <div className="proposalManagementRight">
                <div className = "whiteBox">
                    <div className = "proposalManagementHead">
                        <h3>Create a Proposal</h3>
                    </div>
                    <div className = "PMtextboxes">
                        <textarea value={textboxValueTitle} onChange={(event) => {setTextboxValueTitle(event.target.value)}} className= 'titleNewProposal' id='titleNewProposal' type='textarea' placeholder='Title'/>
                    </div>
                    <textarea value={textboxValueDescript} onChange={(event) => {setTextboxValueDescript(event.target.value)}} className= 'descriptionNewProposal' id='descriptionNewProposal' type='textarea' placeholder='Project description'/>
                    <div className = "bottomThree">
                        <textarea value={textboxValueLink} onChange={(event) => {setTextboxValueLink(event.target.value)}} className= 'linkNewDescription' id='linkNewDescription' type='textarea' placeholder='Link'/>
                        <textarea value={textboxValueMoney} onChange={(event) => {setTextboxValueMoney(event.target.value)}} className= 'moneyNewDescription' id='moneyNewDescription' type='textarea' placeholder='$00.00'/>
                        <ProposalButton buttonClassName='genericProposalButton' buttonText='Create' onClickFunc={submitProposal}/>
                    </div>   
                </div>
            </div>
        </div>
      )
    } else {
      return (
        <div>
          You do not have permission to view this page. Contact a portal admin if you believe this is a mistake.
        </div>
      )
    }
}

export default ProposalManagement;