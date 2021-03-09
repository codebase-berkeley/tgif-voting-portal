import './SearchBar.css';
import {useState, useEffect} from 'react';

function SearchBar(props) {
    const [keyword, setKeyWord] = React.useState();
    return (
        <div className="SearchBar">
            <input>
                value={keyword}
                placeholder= {"Proposal Name"}
                onChange= {(e) => setKeyWord(e.target.value)}
            </input>
        </div>
    );
}

export default SearchBar;