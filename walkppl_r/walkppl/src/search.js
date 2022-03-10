import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get">
       
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search"
            name="s"
            style={{ position: "absolute", left: 0, top: 0 }}
            
        />
        <button style={{ position: "absolute", left: 145, top: 0 }} type="submit">Search</button>
    </form>
);


export default SearchBar;