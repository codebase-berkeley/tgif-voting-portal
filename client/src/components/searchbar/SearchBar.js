import './SearchBar.css';
import * as FeatherIcon from 'react-feather'

function SearchBar(props) {
    return (
        <div className="SearchBar">
            <FeatherIcon.Search color="#757575" size={20}/>
            <input 
                size="10"
                value={props.keyword}
                placeholder= "Proposal Name"
                onChange= {(e) => props.setKeyword(e.target.value)} />
        </div>
    );
}

export default SearchBar;