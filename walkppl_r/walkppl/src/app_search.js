import Search1 from './search'
import React, { useState } from 'react';

function Search(props) {
    
    const filterPosts = (posts, query) => { 
        console.log({query:query});
    if (!query) {
        console.log({here:"hi"});
        console.log(posts);
        return posts;
    }

    return props.songs.filter((post) => {
        const postName = post.title.toLowerCase();
        const postArtist = post.artist.toLowerCase();
        console.log({tile:postName.tile});
        console.log({artist:postName.artist});
        return postName.includes(query) || postArtist.includes(query);
    });
};

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(props.songs, searchQuery);
    console.log({"props.songs":props.songs});

    
    return (
        <div>
            <Search1
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div>
                {filteredPosts.map((post) => (
                    <button style={{ display: "block", marginLeft: 50 }} type={post.artist}>{post.title}</button>
                    
                ))}
                
            </div>
        </div>
    )};

export default Search;