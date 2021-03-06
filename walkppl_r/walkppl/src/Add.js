import {FaCoffee} from "react-icons/fa"
import {TextField} from '@material-ui/core';
import React, { useState, useRef, useEffect } from "react";
import db from "./firebase"
import firebase from "firebase/compat/app"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Addhelper from './clickPlaylist'



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

export default AddSong;
