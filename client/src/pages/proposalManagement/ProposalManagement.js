import './ProposalManagement.css';
import PopUpModal from '../../components/popupModal/PopUpModal';
import React, { useState, useEffect } from 'react';
import Row from '../../components/row/Row';
import TrashCan from '../../assets/TrashCan.svg';
import xIcon from '../../assets/xIcon.svg';

const proposals = [
    {
        title: "Mapping for Environmental Justice",
        description: `MEJ is an
        initiative to create interactive and publicly-accessible maps displaying
        environmental justice data for individual states.`,
    },
  
    {
      title: "Add Fire to the Fire Trails",
      description: "The only thing missing from the fire trails are fire. This will help hikers connect with nature.",
    },
  
    {
        title: "Give All Students A Meal Plan",
        description: `We want to give every student at UC Berkeley a meal plan for all
        4 years.`,
    },
    
    {
      title: "Paint the Campanile Pink",
      description: "The campanile should be pink!",
    },
  
    {
      title: "Make Big C Bigger!",
      description: "MAKE BIG C BIG AGAIN!"
    },
  
    {
      title: "Give Oski A Makeover",
      description: "Here's something we all know: Oski is creepy. We are asking for $1,000,000 to give him a makeover!",
    },
    
    {
      title: "Zero Waste 2020",
      description: "Increase recycling by 200%",
    },
  
    {
      title: "Save The Dogs",
      description: "Top dog saves dogs!"
    },
    
    {
      title: "BerkeleyMoves! Carsharing Pilot",
      description: "The UC Berkeley Parking & Transportation Berkeley",
    },
  
    {
      title: "Plant 1,000,000 Trees",
      description: "The goal is to plant 1,000,000 trees by the end of the year. ",
    },
  
    {
      title: "Trees for the Lorax",
      description: "I speak for the trees",
    },
  
    {
      title: "ASUC Garden",
      description: "We want to build a garden on Sproul",
    },
  
    {
      title: "Biofuels Technology R&D and Procurement",
      description: "Repurpose waste cooking oil produced by Cal Dining facilities into biodiesel for use as a cleaner alternative fuel for campus vehicles."
    },
  
    {
      title: "Zero Waste Fellow",
      description: "The creation of the Zero Waste Fellow position (similar to Carbon Neutrality or Engagement Fellows) will allow for institutionalized leadership that will continue to build upon and expand zero waste work."
    },
  
    {
      title: "Resilient Sustainibility Community Fellows",
      description: "This project hopes to provide up to seven (7) post-baccalaureate fellowships for seniors."
    }
  ]

function ProposalManagement() {
    /* Contains all proposals. */
    const proposalHTML = []
    for (let i = 0; i < proposals.length; i++) {
        proposalHTML.push(<Row changeTitle={(x) => {setProposalTitle(x)}} 
                            changeDescription={(x) => {setProposalDescription(x)}}
                            title={proposals[i].title} 
                            description={proposals[i].description}
                            displayX="true"
                            x={xIcon}
                            vote={proposals[i].voted ? proposals[i].voted : ""}
                            />);
    } 

    const [proposalListDefault, setProposalListDefault] = useState(proposals);
    const [proposalList, setProposalList] = useState(proposalHTML);

    const [proposalTitle, setProposalTitle] = useState("Mapping for Environmental Justice");
    const [proposalDescription, setProposalDescription] = useState("MEJ is an initiative to create interactive and publicly-accessible maps displaying environmental justice data for individual states.");  


    

    const[textboxValue1, setTextboxValue1] = React.useState('');
    const[textboxValue2, setTextboxValue2] = React.useState('');
    const[textboxValue3, setTextboxValue3] = React.useState('');
    const[textboxValue4, setTextboxValue4] = React.useState('');
    const[textboxValue5, setTextboxValue5] = React.useState('');

    return (
        

        <div className="proposalManagement">
            {/* <PopUpModal warning="Are you sure you want to delete these proposals?"
                    secondaryText="cancel"
                    primaryText="delete"
                    /> */}
            <div className="proposalManagementLeft"> 
                <div className="trashCan">
                    <img src={TrashCan} className="TrashCanIcon"></img>
                </div>
                <div className="proposal-list">
                    {proposalList}
                </div>
            </div>
        
            <div className="proposalManagementRight">
                <div className = "whiteBox">
                    <div className = "proposalManagementHead">
                        <h3>Create a Proposal</h3>
                    </div>
                    <div className = "PMtextboxes">
                        <textarea value={textboxValue1} onChange={(event) => {setTextboxValue1(event.target.value)}} className= 'titleNewProposal' id='titleNewProposal' type='textarea' placeholder='title'/>
                        <textarea value={textboxValue2} onChange={(event) => {setTextboxValue2(event.target.value)}} className= 'dateNewProposal' id='dateNewProposal' type='textarea' placeholder='MM/DD/YY'/>
                    </div>
                    <textarea value={textboxValue3} onChange={(event) => {setTextboxValue3(event.target.value)}} className= 'descriptionNewProposal' id='descriptionNewProposal' type='textarea' placeholder='Project description'/>
                    <div className = "bottomThree">
                        <textarea value={textboxValue4} onChange={(event) => {setTextboxValue4(event.target.value)}} className= 'linkNewDescription' id='linkNewDescription' type='textarea' placeholder='link'/>
                        <textarea value={textboxValue5} onChange={(event) => {setTextboxValue5(event.target.value)}} className= 'moneyNewDescription' id='moneyNewDescription' type='textarea' placeholder='$ requested'/>
                        <button className="createProposalButton">
                            Create
                        </button>
                    </div>   
                </div>
            </div>
        </div>
    );
}

    
export default ProposalManagement;