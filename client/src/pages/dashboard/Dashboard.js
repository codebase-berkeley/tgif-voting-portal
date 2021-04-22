import React from 'react';
import { useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import ProposalButton from '../proposalDetails/ProposalButton.js';
import { Link } from "react-router-dom";
import axios from 'axios';

var PRIVILEGES ='Voting Member';

const proposals = [
  {
      title: "Mapping for Environmental Justice",
      description: `MEJ is an
      initiative to create interactive and publicly-accessible maps displaying
      environmental justice data for individual states.`,
      voted: yesIcon
  },

  {
    title: "Add Fire to the Fire Trails",
    description: "The only thing missing from the fire trails are fire. This will help hikers connect with nature.",
    voted: noIcon
  },

  {
      title: "Give All Students A Meal Plan",
      description: `We want to give every student at UC Berkeley a meal plan for all
      4 years.`
  },
  
  {
    title: "Paint the Campanile Pink",
    description: "The campanile should be pink!",
    voted: yesIcon
  },

  {
    title: "Make Big C Bigger!",
    description: "MAKE BIG C BIG AGAIN!"
  },

  {
    title: "Give Oski A Makeover",
    description: "Here's something we all know: Oski is creepy. We are asking for $1,000,000 to give him a makeover!",
    voted: yesIcon
  },
  
  {
    title: "Zero Waste 2020",
    description: "Increase recycling by 200%"
  },

  {
    title: "Save The Dogs",
    description: "Top dog saves dogs!",
    voted: yesIcon
  },
  
  {
    title: "BerkeleyMoves! Carsharing Pilot",
    description: "The UC Berkeley Parking & Transportation Berkeley",
    voted: noIcon
  },

  {
    title: "Plant 1,000,000 Trees",
    description: "The goal is to plant 1,000,000 trees by the end of the year. "
  },

  {
    title: "Trees for the Lorax",
    description: "I speak for the trees",
    voted: yesIcon
  },

  {
    title: "ASUC Garden",
    description: "We want to build a garden on Sproul",
    voted: noIcon
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

function Dashboard() {
  /* Contains all proposals. */
  const proposalHTML = []
  for (let i = 0; i < proposals.length; i++) {
    proposalHTML.push(<Row changeTitle={(x) => {setProposalTitle(x)}} 
                          changeDescription={(x) => {setProposalDescription(x)}}
                          title={proposals[i].title} 
                          description={proposals[i].description}
                          vote={proposals[i].voted ? proposals[i].voted : ""}/>);
  }

  /* Create states for SearchBar. */
  const [input, setInput] = useState("");
  const [proposalListDefault, setProposalListDefault] = useState(proposals);
  const [proposalList, setProposalList] = useState(proposalHTML);

  const [proposalTitle, setProposalTitle] = useState("Mapping for Environmental Justice");
  const [proposalDescription, setProposalDescription] = useState("MEJ is an initiative to create interactive and publicly-accessible maps displaying environmental justice data for individual states.");

  /* Updates proposalList state based on SearchBar input. */
  const updateInput = (input) => {
    let filteredList = [];
    for (let i = 0; i < proposals.length; i++) {
      if (proposalListDefault[i].title.toLowerCase().includes(input.toLowerCase())) {
        filteredList.push(<Row changeTitle={(x) => {setProposalTitle(x)}}
                                changeDescription={(x) => {setProposalDescription(x)}}
                                title={proposalListDefault[i].title} 
                                description={proposalListDefault[i].description}
                                displayX="false"
                                x=""    
                                vote={proposalListDefault[i].voted ? proposalListDefault[i].voted : ""} />)
      }
      setInput(input);
      setProposalList(filteredList);
    } 
  }

  const[textboxValue, setTextboxValue] = React.useState('');

  const handleSubmit = async () => {
    if (textboxValue !== '') {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8000/post_comment',
          data: {
            user_id: 1,
            proposal_id: 1,
            comment_text: textboxValue
          }
        });
      } catch(error) {
        console.log(error);
      }
      setTextboxValue('');
    }
  };

  /* VOTING BUTTON STATES */
  const dashboardPressedYesButtonClassName = 'dashboardPressedYesButton votingMemberVotingButton';
  const dashboardUnpressedYesButtonClassName = 'dashboardUnpressedYesButton votingMemberVotingButton';
  const [dashboardYesButtonClassName, setDashboardYesButtonClassName] = useState(dashboardUnpressedYesButtonClassName);

  const dashboardPressedNoButtonClassName = 'dashboardPressedNoButton votingMemberVotingButton';
  const dashboardUnpressedNoButtonClassName = 'dashboardUnpressedNoButton votingMemberVotingButton';
  const [dashboardNoButtonClassName, setDashboardNoButtonClassName] = useState(dashboardUnpressedNoButtonClassName);

  return (
    <div className="dashboard">
      <div className="dashboard-screen">
        <div className="left-proposals">
          <SearchBar keyword={input} setKeyword={updateInput}/>
          <div className="proposal-list">
            {proposalList}
          </div>
          <div className="shadows" aria-hidden="true"></div>
        </div>
        <div className="right-proposals">
          <div className="proposal-description">
            <div className="proposal-head-title">{proposalTitle}</div>
            <div className="proposal-head-description">{proposalDescription}</div>
            <div className="dividing-line"></div>
            <div className={PRIVILEGES === 'Voting Member' ? "comment-area" : "comment-area nonvoting-comment-area"}>
              <textarea className="comment-box" value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} id="textbox" name="textbox" placeholder="Leave a comment" rows="7" cols="53"></textarea>
              <div className="discussion-buttons">
                <button className="post-comment" onClick={handleSubmit}>Post Comment</button>
                <Link to="/proposal-details">
                  <button className="view-discussion" type="submit">View Discussion</button>
                </Link>
              </div>
            </div>
            {(PRIVILEGES === 'Voting Member')
              ? <div className="dashboardVotingButtonsContainer">
                  <div className='leftDashboardButtonContainer dashboardButtonContainer'>
                    <ProposalButton buttonText='Vote Yes' buttonClassName={dashboardYesButtonClassName}
                      onClickFunc={() => {setDashboardYesButtonClassName(dashboardPressedYesButtonClassName);
                                          setDashboardNoButtonClassName(dashboardUnpressedNoButtonClassName);}}
                    />
                  </div>

                  <div className='rightDashboardButtonContainer dashboardButtonContainer'>
                    <ProposalButton buttonText='Vote No' buttonClassName={dashboardNoButtonClassName}
                      onClickFunc={() => {setDashboardYesButtonClassName(dashboardUnpressedYesButtonClassName);
                                          setDashboardNoButtonClassName(dashboardPressedNoButtonClassName);}}
                    />
                  </div>
                </div>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
