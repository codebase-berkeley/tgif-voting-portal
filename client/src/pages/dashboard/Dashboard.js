import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import { Link } from "react-router-dom";
import axios from 'axios';
import ProposalButton from './../proposalDetails/ProposalButton.js';


function Dashboard() {
  /* Contains all proposals. */
  // const proposalHTML = []

  const [proposals, setProposals] = useState([]);

  const [filteredProposalsList, setFilteredProposalsList] = useState([]);

  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/getProposals');
    let proposal_lst = response.data;
    /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
    while in deleting mode */
    proposal_lst.forEach(proposal => {
      proposal_lst.checked = false;
    })
		setProposals(proposal_lst);
    setFilteredProposalsList(proposal_lst);
  }

  useEffect(() => {
    fetchProposals();
  }, []);

  /* Create states for SearchBar. */
  const [input, setInput] = useState("");
  // const [proposalList, setProposalList] = useState(proposalHTML);

  const [proposalTitle, setProposalTitle] = useState("Mapping for Environmental Justice");
  const [proposalDescription, setProposalDescription] = useState("MEJ is an initiative to create interactive and publicly-accessible maps displaying environmental justice data for individual states.");
  const [wantedPropID, setWantedPropID] = useState(1);

  /* Updates proposalList state based on SearchBar input. */
  const updateInput = (input) => {
    let filteredList = [];
    for (let i = 0; i < proposals.length; i++) {
      if (proposals[i].title.toLowerCase().includes(input.toLowerCase())) {
        filteredList.push(proposals[i]);
      }
      setInput(input);
      setFilteredProposalsList(filteredList);
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
            proposal_id: wantedPropID,
            comment_text: textboxValue
          }
        });
      } catch(error) {
          console.log(error);
      }
      setTextboxValue('');
    }
  };

  const submitVote = async (voteDecision) => {
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8000/submitVote',
        data: {
          vote: voteDecision,
          user_id: 1,
          proposal_id: wantedPropID
        }
      });
    } catch(error) {
      console.log("There was an error in submitting your vote in dashboard.");
      console.log(error.stack);
    }
  };

  /* REACT STATES FOR NONADMIN VOTING BUTTONS */
  const nonAdminPressedYesButtonClassName = 'pressedYesButton dashboardYesButton';
  const nonAdminUnpressedYesButtonClassName = 'unpressedYesButton dashboardYesButton';
  const [nonAdminYesButtonClassName, setNonAdminYesButtonClassName] = useState(nonAdminUnpressedYesButtonClassName);
  
  const nonAdminPressedNoButtonClassName = 'pressedNoButton dashboardNoButton';
  const nonAdminUnpressedNoButtonClassName = 'unpressedNoButton dashboardNoButton';
  const [nonAdminNoButtonClassName, setNonAdminNoButtonClassName] = useState(nonAdminUnpressedNoButtonClassName);
    

  return (
    <div className="dashboard">
      <div className="dashboard-screen">
        <div className="left-proposals">
          <SearchBar keyword={input} setKeyword={updateInput}/>
          <div className="proposal-list">
            {filteredProposalsList.map((proposal) => (
                        <Row changeTitle={(x) => {setProposalTitle(x)}}
                        changeDescription={(x) => {setProposalDescription(x)}}
                        changeWantedPropID={(x) => {setWantedPropID(x)}}
                        changeTextBoxValue={() => {setTextboxValue("")}}
                        title={proposal.title} 
                        description={proposal.description_text}
                        vote={proposal.voted ? proposal.voted : ""} 
                        id={proposal.id}
                        
                        />
                    ))}
            
          </div>
          <div className="shadows" aria-hidden="true"></div>
        </div>
        <div className="right-proposals">
          <div className="proposal-description">
            <div className="proposal-head-title">{proposalTitle}</div>
            <div className="proposal-head-description">
              <div className="textOnly2">
                {proposalDescription}
              </div>
            </div>
            <div className="dividing-line"></div>
            <div className="comment-area">
              <textarea value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} id="textbox" name="textbox" className="comment-box" placeholder="Leave a comment" rows="7" cols="53"></textarea>
              <div className="discussion-buttons">
              <button className="post-comment" onClick={handleSubmit}>Post Comment</button>
              <Link to={`/proposal-details/${wantedPropID}`}>
                  <button className="view-discussion" type="submit">View Discussion</button>
              </Link>
            </div>
            </div>
            <div className="voting-buttons">
              <ProposalButton buttonText='Vote Yes' buttonClassName={nonAdminYesButtonClassName}
                    onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminPressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminUnpressedNoButtonClassName);
                                  submitVote(true);}}
                />
                <ProposalButton buttonText='Vote No' buttonClassName={nonAdminNoButtonClassName}
                    onClickFunc={() => {setNonAdminYesButtonClassName(nonAdminUnpressedYesButtonClassName);
                                  setNonAdminNoButtonClassName(nonAdminPressedNoButtonClassName);
                                  submitVote(false);}}
                />
                {/* <button className="vote-yes" onClick={() => submitVote(true) }>Vote Yes</button>
                <button className="vote-no" onClick={() => submitVote(false)}>Vote No</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
