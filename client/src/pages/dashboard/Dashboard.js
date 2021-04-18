import React from 'react';
import {useEffect, useState} from 'react';
import Row from '../../components/row/Row';
import './Dashboard.css';
import noIcon from '../../assets/Delete.svg';
import yesIcon from '../../assets/Checked.svg';
import SearchBar from '../../components/searchbar/SearchBar';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';


function Dashboard() {
  /* Contains all proposals. */
  const proposalHTML = []

  const [proposals, setProposals] = useState([]);

  let { wantedPropID } = useParams();

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
  }, []);

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
      setProposals(filteredList);
    } 
  }

  // function updateProposalLists(input) {
  //   let filteredList = [];
  //   /* Initialize false <checked> attributes for each proposal; used for checkbox tracking
  //   while in deleting mode */
  //   proposals.forEach(proposal => {
  //     if (proposal.title.toLowerCase().includes(input.toLowerCase())) {
  //       <Row changeTitle={(x) => {setProposalTitle(x)}}
  //         changeDescription={(x) => {setProposalDescription(x)}}
  //         title={proposal.title} 
  //         description={proposal.description_text}
  //         vote={proposal.voted ? proposal.voted : ""} 
  //         id={proposal.id}
  //         />
  //     }
  //   })
	// 	//setProposals(filteredList);
  // }

  const[textboxValue, setTextboxValue] = React.useState('');

  const handleSubmit = async () => {
    if (textboxValue !== '') {
      try {
        await axios({
          method: 'post',
          url: 'http://localhost:8000/post_comment',
          data: {
            user_id: 1,
<<<<<<< HEAD
            proposal_id: {wantedPropID},
=======
            proposal_id: 3,
>>>>>>> 8da1e42eedcbcc0bf60f67ec694b848d0bbf6644
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
<<<<<<< HEAD
              <Link to={`/proposal-details/${wantedPropID}`}>
=======
              <Link to="/proposal-details/" + {proposal_id}>
>>>>>>> 8da1e42eedcbcc0bf60f67ec694b848d0bbf6644
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
