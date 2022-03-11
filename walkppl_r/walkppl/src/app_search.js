import SearchBar from './search'
import React, { useState } from 'react';
import styles from './search.module.css'

function Search(props) {
    const title = props.title
        const artist = props.artist_name
        const album = props.album_name
    const [isOpen, setIsOpen] = useState(false);
    const togglePlay = () => {
        setIsOpen(!isOpen);
    } 
    const start = (title) => {
        console.log(title)
        props.setSong(title)
      }
    const NewSong = (props) => { 
        const title = props.title
        const artist = props.artist_name
        const album = props.album_name
        let audio = new Audio(props.songs.src)
        const start = () => {
                audio.play()
              }
        return (<><div className={styles.playlistsong} onClick={togglePlay} >
            <p id="titleid">{title}</p>
            <p id="artistid">{artist}</p>
            <p id="albumid">{album}</p>
            {isOpen && start()} 
          </div>
          <hr className={styles.line}/></>)
    }

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
        <div className={styles.searchBar}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className={styles.playlistheader}>
                        <p id='title'>Title</p>
                        <p id='artist'>Artist</p>
                        <p id='album'>Album</p>
                    </div>
                    <hr />
            <div>
                {filteredPosts.map((post) => (
                    <div className={styles.searchElements} type={post.artist} onClick={togglePlay}>
                        <p className={styles.title}>{post.title}</p>
                        <p className={styles.artist}>{post.artist}</p>
                        <p className={styles.album}>{post.album}</p>
                        {isOpen && start(post.title)} 
                        
                    </div>
                ))}
                
            </div>
        </div>
    )};

export default Search;