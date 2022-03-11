import styles from "./home.module.css";
import {AiFillCloseCircle} from "react-icons/ai"
import {MdAddCircle} from "react-icons/md"
import react, {useState, useRef, useEffect} from "react";
import React from "react";
import AppSearch from './app_search'
import Walkppl from './walkppl'
import {FaCoffee} from "react-icons/fa"
import soundfile from './audio_samples/Paradise_Coldplay.mp3'
import {submit} from './Add'
import {TextField} from '@material-ui/core';
import db from "./firebase"
import firebase from "firebase/compat/app"

const NewSong = (props) => { 
    const title = props.title
    const artist = props.artist_name
    const album = props.album_name
    const [isOpen, setIsOpen] = useState(false);
    const togglePlay = () => {
            setIsOpen(!isOpen);
        } 
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

const Clickplaylist = props => {

  const [users, setUsers] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  useEffect(() => {

    const fetchUsers = async () => {
      const usersCollection = await db.collection("Music").get();
      let original_songs = []
      
        usersCollection.docs.forEach((doc) => {
          let song = { ...doc.data()}

          original_songs.push(song)
        })
      setUsers(original_songs)
    };
    fetchUsers();
  }, []);
  
    useEffect(() => {
      setNextSongIndex(() => {
        if (currentSongIndex + 1 > users.length - 1) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    }, [currentSongIndex]);

    function AddSong(props) {
  
        const[add,setAdd] = useState([]);
        const [fileUrl, setFileUrl] = React.useState(null)
        const [musicUrl, setMusicUrl] = React.useState(null)
        const [disable, setDisable] = React.useState(true);
        
        const filechanged = async (e) =>{
            var file = e.target.files[0];
            var storageRef = firebase.storage().ref("Image");
            const fileRef = storageRef.child(file.name)
            await fileRef.put(file)
            setFileUrl(await fileRef.getDownloadURL())   
        }
        const musicchanged = async (e) =>{
            var music = e.target.files[0];
            var storagemRef = firebase.storage().ref("Music");
            const musicRef = storagemRef.child(music.name)
            await musicRef.put(music)
            setMusicUrl(await musicRef.getDownloadURL())
      }
      
      React.useEffect(() => {
        if (musicUrl !== null) {
          setDisable(false);
          alert("click on submit")
          console.log(disable)
        }
      },[musicUrl])
      
    
      const submit =  (e) => {
        e.preventDefault();
        if (musicUrl != null && fileUrl !== null) {
        const musicname =props.songData.title;
        console.log(musicname)
         if (!musicname) {
           return;
         }
         db.collection("Music").doc(musicname).set({
           title: musicname,
           artist: props.songData.owner,
           album: props.songData.album,
           track: 'enjoy',
           year: '2021',
           img_src: fileUrl,
           src: musicUrl,
         });
         AddSong2(props.songData.title,props.songData.owner,props.songData.album)
         console.log(props.songdata.title)
         alert("Music added");
        } 
       
        
    }
      return (
        <div className="Upload-Song">
          <button onClick={submit}>
            <FaCoffee />
          </button>
          <TextField label="Title" 
              value={props.songData.title}
              onChange={e => props.setSongData({...props.songData, title: e.target.value})}
          />
          <TextField label="Artist"
          value={props.songData.owner}
              onChange={e => props.setSongData({...props.songData, owner: e.target.value})}
          />
          <TextField label="album" 
          value={props.songData.album}
              onChange={e => props.setSongData({...props.songData, album: e.target.value})}
          />
          <input
                type="file"
                name="img"
                onChange={filechanged}
                required
              />
         <input type="file" accept="audio/mp3" onChange={musicchanged} required/>
    
         
          
        </div>
      );
    }
    const WalkPeople = props.WalkPeople1
    const[add,setAdd] = useState([]);
    const [showAddSong, setShowAddSong] = useState(false);
    const [songData , setSongData] = useState({});
    const [mp3Data , setMp3Data] = useState();
    const AddSong2 = (t,artist,album) => {
        console.log('hi')
        setAdd(add.concat(<NewSong key={add.length} title={t} artist_name = {artist} album_name = {album}/>));
    };
   
   
    const [isOpen, setIsOpen] = useState(false);
    const togglePlay = () => {
            setIsOpen(!isOpen);
        } 
    const start = () => { 
          WalkPeople.current.play()
        }
    const onUpload = ()=>{
        setShowAddSong(false)
      }

        return (
        
        <div className={styles.grid1}>
            <div className={styles.playlist} >
                <header >Cries Happy Tears
                    {showAddSong? (
                    <AddSong 
                        onUpload={onUpload}
                        songData={songData}
                        setSongData={setSongData}
                        mp3Data={mp3Data}
                        setMp3Data={setMp3Data}
                    />) : (
                <button className={styles.playPause} onClick={() => {setShowAddSong(true)}}>
                    <MdAddCircle />
                </button> ) } 
                <AiFillCloseCircle className={styles.closebutton} onClick={props.handleClose}/>     
                 </header>
                    <AppSearch 
                  currentSongIndex={currentSongIndex}
                  setCurrentSongIndex={setCurrentSongIndex}
                  nextSongIndex={nextSongIndex}
                  songs={users}
                  shuffle={setUsers}
                />
        <div className={styles.playlistsong} onClick={togglePlay} >
            <p>{props.songData?.title}</p>
            <p>Oatmello</p>
            <p>Snapshots</p>
         {isOpen && start()} 
         
      </div>
      <hr className={styles.line}/>
      <div className={styles.playlistsong} onClick={togglePlay} >
            <p>$Sorry</p>
            <p>Peachy!</p>
            <p>Shiloh</p>
         {isOpen && start()} 
      </div>
      <hr className={styles.line}/>
      <div className={styles.playlistsong} onClick={togglePlay} >
            <p>Affection</p>
            <p>jinsang</p>
            <p>Life</p>
         {isOpen && start()} 
      </div>
      <hr className={styles.line}/>
            {add}
            </div>
             </div>   
        )
    }

export default Clickplaylist;
