import './SearchBar.css';
import {useState, useEffect} from 'react';

function SearchBar(props) {
    return (
        <div className="SearchBar">
            <input>
                value={props.keyword}
                placeholder= {"Proposal Name"}
                onChange= {(e) => props.setKeyWord(e.target.value)}
            </input>
        </div>
    );
}

export default SearchBar;