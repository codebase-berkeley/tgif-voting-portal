import './ProposalManagement.css';
import PopUpModal from '../../components/popupModal/PopUpModal';
import React, { useState, useEffect } from 'react';
import Row from '../../components/row/Row';
import TrashCan from '../../assets/TrashCan.svg';
import xIcon from '../../assets/xIcon.svg';
import axios from "axios";
import ProposalButton from '../proposalDetails/ProposalButton';

// replace with other team's svgs later
import enterEditingIcon from '../../assets/Checked.svg';
import exitEditingIcon from '../../assets/xIcon.svg';


function ProposalManagement() {
  const [proposals, setProposals] = useState([]);
  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/getProposals');
    console.log(response);
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

  const [proposalListDefault, setProposalListDefault] = useState(proposals);
 //const [proposalList, setProposalList] = useState(proposalHTML);

  const [proposalTitle, setProposalTitle] = useState("Mapping for Environmental Justice");
  const [proposalDescription, setProposalDescription] = useState("MEJ is an initiative to create interactive and publicly-accessible maps displaying environmental justice data for individual states.");  

  const[textboxValueTitle, setTextboxValueTitle] = React.useState('');
  const[textboxValueDescript, setTextboxValueDescript] = React.useState('');
  const[textboxValueLink, setTextboxValueLink] = React.useState('');
  const[textboxValueMoney, setTextboxValueMoney] = React.useState('');

  const [deletingMode, setDeletingMode] = useState(false);
    
    /* REACT STATES FOR EDIT BUTTONS */
  var enterEditingIconDefault = 'enterDeletingIconContainer';
  var exitEditingIconDefault = 'exitDeletingIconContainer';
  var deleteIconDefault = 'trashCan';
  // var displayModal = false;
  var IS_MANAGEMENT = true;

  const [enterEditingIconClassName, setEnterEditingIconClassName] = useState(enterEditingIconDefault);
  const [exitEditingIconClassName, setExitEditingIconClassName] = useState(exitEditingIconDefault + ' hide');
  const [deleteIconClassName, setDeleteIconClassName] = useState(deleteIconDefault + ' hide');
  const [displayModal, setDisplayModal] = useState(false);

  /** Handles clicking the pencil icon to start deleting proposals */
  function enterDeletingMode() {
    setEnterEditingIconClassName(enterEditingIconDefault + ' hide');
    setExitEditingIconClassName(exitEditingIconDefault);
    setDeleteIconClassName(deleteIconDefault);
    setDeletingMode(true);
    // console.log(deletingMode);
  }

  /** Handles clicking the checkmark icon to exit proposal deleting mode */
  function exitDeletingMode() {
    setEnterEditingIconClassName(enterEditingIconDefault);
    setExitEditingIconClassName(exitEditingIconDefault + ' hide');
    setDeleteIconClassName(deleteIconDefault + ' hide');
    setDeletingMode(false);
    // console.log(deletingMode);
  }

  function displayDeleteProposalsModal() {
    setDisplayModal(true);
  }

  function showModal() {
    if (displayModal) {
      return (
        <PopUpModal warning="Are you sure you want to delete these proposals?"
              secondaryText="cancel"
              primaryText="delete"
              primaryFunc={removeProposals}
              />
        )
    }
  }
    const submitProposal = async () => {
      if (textboxValueMoney !== '' && isNaN(parseFloat(textboxValueMoney))){
        console.log("String submited for value");
        document.getElementById("moneyNewDescription").style.borderColor="#FF0000";
        document.getElementById("moneyNewDescription").style.backgroundColor="#ffcccb";
      }
      else if (textboxValueTitle !== ''){
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

  async function removeProposals() {
    /* Go through each checkbox and determine which proposals should be deleted */
    console.log('enter remove proposals');
    const propsIdsToDelete = [];
    proposals.forEach((prop) => {
      console.log(prop);
      if (prop.checked) {
        propsIdsToDelete.push(prop.id);
      }
    })
    console.log(propsIdsToDelete);
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
        fetchProposals();
      } catch(error) {
          console.log(error);
      }
      
    }
  }

    return (
        
      <div className = "ProposalManagementOuter">
          <div className={enterEditingIconClassName}>
            <input className='enterDeletingIconContainer proposalsButton' type="image" src={enterEditingIcon} alt='Enter Deleting Mode'
            title='Edit Members' onClick={enterDeletingMode}/>
          </div>
          <div className={exitEditingIconClassName}>
            <input className='exitDeletingIconContainer proposalsButton' type="image" src={exitEditingIcon} alt='Exit Deleting Mode'
            title='Finish Editing' onClick={exitDeletingMode}/>
          </div>
            <div className="proposalManagement">
            <div className="proposalManagementLeft"> 
                <div className={deleteIconClassName}>   
                    <input className='removeProposalsButton proposalsButton' type="image" src={TrashCan} alt='Delete Selected Proposals'
                    title='Remove Selected Proposals' onClick={displayDeleteProposalsModal}/>
                </div>
                <div className="proposal-list">
                    {proposals.map((proposal) => (
                        <Row 
                          title={proposal.title} 
                          description={proposal.description}
                          mode={deletingMode}
                          isManagement= {IS_MANAGEMENT}
                          vote={proposal.voted ? proposal.voted : ""}
                          proposalCheckboxOnClick = {() => {
                            const proposalsCopy = [...proposals];
                            proposalsCopy.forEach((proposalCopy) => {
                              if (proposalCopy.id === proposal.id) {
                                proposalCopy.checked = !proposalCopy.checked;
                              }
                              });
                              setProposals(proposalsCopy);
                              // updateSelectAllCheckbox();
                              }}
                            isChecked={proposal.checked}
                          />
                    ))}
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
        {showModal()}
      </div>  
    );
}

export default ProposalManagement;