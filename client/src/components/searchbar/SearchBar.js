import './SearchBar.css';
import * as FeatherIcon from 'react-feather'

function SearchBar(props) {
    return (
        <div className="SearchBar">
            <FeatherIcon.Search className="searchImg" color="#757575" size={20}/>
            <input 
                className = "searchBar"
                value={props.keyword}
                placeholder= "Proposal Name"
                onChange= {(e) => props.setKeyword(e.target.value)} />
        </div>
    );
}

export default SearchBar;