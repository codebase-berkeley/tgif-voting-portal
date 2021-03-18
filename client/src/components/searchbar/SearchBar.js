import './SearchBar.css';
import * as FeatherIcon from 'react-feather'

function SearchBar(props) {
    return (
        <div className="searchbar">
            <FeatherIcon.Search className="search-img" color="#757575" size={20}/>
            <input 
                className = "searchbar-input"
                value={props.keyword}
                placeholder= "Proposal Name"
                onChange= {(e) => props.setKeyword(e.target.value)} />
        </div>
    );
}

export default SearchBar;