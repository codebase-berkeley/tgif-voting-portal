import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import { Link } from "react-router-dom";
import axios from 'axios';


function Dashboard() {
  /* Contains all proposals. */
  const proposalHTML = []
  // for (let i = 0; i < proposals.length; i++) {
  //   proposalHTML.push(<Row changeTitle={(x) => {setProposalTitle(x)}} 
  //                         changeDescription={(x) => {setProposalDescription(x)}}
  //                         title={proposals[i].title} 
  //                         description={proposals[i].description}
  //                         vote={proposals[i].voted ? proposals[i].voted : ""}/>);
  // }

  const [proposals, setProposals] = useState([]);

  async function fetchProposals() {
		const response = await axios.get('http://localhost:8000/getProposals');
    console.log(response);
    let proposal_lst = response.data;
    /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
    while in deleting mode */
    proposal_lst.forEach(proposal => {
      proposal_lst.checked = false;
    })
		setProposals(proposal_lst);
  }

  useEffect(() => {
    fetchProposals();
    updatePropID();
  }, []);

  /* Create states for SearchBar. */
  const [input, setInput] = useState("");
  const [proposalListDefault, setProposalListDefault] = useState(proposals);
  const [proposalList, setProposalList] = useState(proposalHTML);

  const [proposalTitle, setProposalTitle] = useState("Mapping for Environmental Justice");
  const [proposalDescription, setProposalDescription] = useState("MEJ is an initiative to create interactive and publicly-accessible maps displaying environmental justice data for individual states.");
  const [currPropID, setCurrPropID] = useState('');

  const updatePropID = async () => {
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:8000/currentPropID',
        data: {
          propID: currPropID
        }
      });
    } catch(error) {
      console.log(error);
    }
  };

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
            proposal_id: 3,
            comment_text: textboxValue
          }
        });
      } catch(error) {
        console.log(error);
      }
      setTextboxValue('');
    }
  };
  

  return (
    <div className="dashboard">
      <div className="dashboard-screen">
        <div className="left-proposals">
          <SearchBar keyword={input} setKeyword={updateInput}/>
          <div className="proposal-list">
            {proposals.map((proposal) => (
                        <Row changeTitle={(x) => {setProposalTitle(x)}}
                        changeDescription={(x) => {setProposalDescription(x)}}
                        title={proposal.title} 
                        description={proposal.description_text}
                        vote={proposal.voted ? proposal.voted : ""} 
                        id={proposal.id}
                        lol={(x) => {setCurrPropID(x)}}
                        />
                          
                    ))}
            
          </div>
          <div className="shadows" aria-hidden="true"></div>
        </div>
        <div className="right-proposals">
          <div className="proposal-description">
            <div className="proposal-head-title">{proposalTitle}</div>
            <div className="proposal-head-description">{proposalDescription}</div>
            <div className="dividing-line"></div>
            <div className="comment-area">
              <textarea value={textboxValue} onChange={(event) => {setTextboxValue(event.target.value)}} id="textbox" name="textbox" className="comment-box" placeholder="Leave a comment" rows="7" cols="53"></textarea>
              <div className="discussion-buttons">
              <button className="post-comment" onClick={handleSubmit}>Post Comment</button>
              <Link to="/proposal-details/" + {proposal_id}>
                  <button className="view-discussion" type="submit">View Discussion</button>
              </Link>
            </div>
            </div>
            <div className="voting-buttons">
                <button className="vote-yes">Vote Yes</button>
                <button className="vote-no">Vote No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
