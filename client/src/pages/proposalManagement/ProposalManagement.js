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
  /* Contains all proposals. */
  //const proposalHTML = [];

  const [proposals, setProposals] = useState([]);
  // const [selectedProposals, setSelectedProposals] = useState([]);

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
  const[textboxValueProp, setTextboxValueProp] = React.useState('');
  const[textboxValueDescript, setTextboxValueDescript] = React.useState('');
  const[textboxValueLink, setTextboxValueLink] = React.useState('');
  const[textboxValueMoney, setTextboxValueMoney] = React.useState('');

  const [deletingMode, setDeletingMode] = useState(false);
    
    /* REACT STATES FOR EDIT BUTTONS */
  var enterEditingIconDefault = 'enterDeletingIconContainer';
  var exitEditingIconDefault = 'exitDeletingIconContainer';
  var deleteIconDefault = 'trashCan';
  var IS_MANAGEMENT = true;

  const [enterEditingIconClassName, setEnterEditingIconClassName] = useState(enterEditingIconDefault);
  const [exitEditingIconClassName, setExitEditingIconClassName] = useState(exitEditingIconDefault + ' hide');
  const [deleteIconClassName, setDeleteIconClassName] = useState(deleteIconDefault + ' hide');

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

    const submitProposal = async () => {
      if (textboxValueTitle !== ''){
        try {
          await axios({
            method: 'post',
            url: 'http://localhost:8000/submitProposal',
            data: {
              title: textboxValueTitle,
              organization: textboxValueProp,
              amount_requested: (isNaN(parseInt(textboxValueMoney)) ? 0 : parseInt(textboxValueMoney)),
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
      setTextboxValueProp('');
      setTextboxValueDescript('');
      setTextboxValueLink('');
      setTextboxValueMoney(''); 
    }
  };

  async function removeProposals() {
    // display the modal, if modal returns a true value for primaryClicked, then do somemthing, 
    //else prob just exit this function and stop displaying modal
    /* Go through each checkbox and determine which users should be deleted */
    const propsIdsToDelete = [];
    proposals.forEach((prop) => {
      if (prop.checked) {
        propsIdsToDelete.push(prop.id);
      }
    })
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

  function displayDeleteProposalsModal() {
    return (
    <PopUpModal warning="Are you sure you want to delete these proposals?"
                    secondaryText="cancel"
                    primaryText="delete"
                    primaryFunc={removeProposals}
                    />
    );
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
          {/* <div className={exitEditingIconClassName}>
            <input className='exitDeletingIconContainer proposalsButton' type="image" src={exitEditingIcon} alt='Exit Deleting Mode'
            title='Finish Editing' onClick={exitDeletingMode}/>
          </div> */}
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
                        <textarea value={textboxValueTitle} onChange={(event) => {setTextboxValueTitle(event.target.value)}} className= 'titleNewProposal' id='titleNewProposal' type='textarea' placeholder='title'/>
                        <textarea value={textboxValueProp} onChange={(event) => {setTextboxValueProp(event.target.value)}} className= 'dateNewProposal' id='dateNewProposal' type='textarea' placeholder='MM/DD/YY'/>
                    </div>
                    <textarea value={textboxValueDescript} onChange={(event) => {setTextboxValueDescript(event.target.value)}} className= 'descriptionNewProposal' id='descriptionNewProposal' type='textarea' placeholder='Project description'/>
                    <div className = "bottomThree">
                        <textarea value={textboxValueLink} onChange={(event) => {setTextboxValueLink(event.target.value)}} className= 'linkNewDescription' id='linkNewDescription' type='textarea' placeholder='link'/>
                        <textarea value={textboxValueMoney} onChange={(event) => {setTextboxValueMoney(event.target.value)}} className= 'moneyNewDescription' id='moneyNewDescription' type='textarea' placeholder='$ requested'/>
                        <ProposalButton buttonClassName='genericProposalButton' buttonText='Create' onClickFunc={submitProposal}/>
                    </div>   
                </div>
            </div>
        </div>
        {/* <PopUpModal warning="Are you sure you want to delete these proposals?"
                    secondaryText="cancel"
                    primaryText="delete"
                    /> */}
        
      </div>  
    );
}

    
export default ProposalManagement;