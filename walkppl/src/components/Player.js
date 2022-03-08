import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import AddSong from "../Add";
import db from '../firebase'
import storage from 'firebase/storage'

import {
  faCoffee, faRandom,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requirePropFactory } from "@material-ui/core";

// if you are in NEW branch don't change this 
// plalist 
function Player(props) {
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);
  const [songData , setSongData] = useState({});
  const [mp3Data , setMp3Data] = useState();
  // useEffect(() => {
  //   let unsubscribeFromNewSnapshots = db
  //     .collection("Songs")
  //     .doc()
  //     .onSnapshot((snapshot) => {
  //       console.log("New Snapshot!");
  //       let newMessages = snapshot.data().messages.map(singleMessage => {
  //           singleMessage.createdAt = singleMessage.createdAt.seconds * 1000;
  //           return singleMessage;
  //       })
  //       setMessages(newMessages);
  //     });
  //   return function cleanupBeforeUnmounting() {
  //     unsubscribeFromNewSnapshots();
  //   };
  // }, []);
  // const onSend = useCallback(
  //   async (messages = []) => {
  //     if (messages.length < 1) return;

  //     if (imageURI !== null) {
  //       let downloadURL = await uploadImage();
  //       if (downloadURL) {
  //         messages[0].image = downloadURL;
  //       }
  //     }

  //     db.collection("Chats")
  //       .doc(chatname)
  //       .update({
  //         // arrayUnion appends the message to the existing array
  //         messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
  //       });
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, messages)
  //     );
  //   },
  //   [imageURI]
  // );
  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  // works perfectly 
  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  const ShuffleSongs = (shuffle = true) =>{
    if (shuffle) {
      
      audioElement.current.pause();
        props.shuffleSongs(() => {
        let temp1 = props.songs;
        temp1 = temp1.sort(() => Math.random() - 0.5)
        return props.songs;
      });
      
       props.setCurrentSongIndex(() => {
        if (props.currentSongIndex == 0)
        {
       
          return props.currentSongIndex + 1;
        }
        else{
        return props.currentSongIndex -1; 
        } 
      }); 

    

  
    }
  };


 
   
  const onUpload = ()=>{
    console.log(mp3Data)
    setShowAddSong(false)
    //fetchsong()
  }
  

 
  return (
    <>
      <p>
        <div className="text-anim">
          <strong>Upcoming Song:</strong>
        </div>

        <div className="nextsong-details">
          <img
            
            src={props.songs[props.nextSongIndex].img_src}
            alt={props.songs[props.nextSongIndex].title}
            style={{ width: "4em", height: "auto" }}
          />
          <p>
            <b>{props.songs[props.nextSongIndex].title} </b>&nbsp; by &nbsp;
            <b>{props.songs[props.nextSongIndex].artist}</b>
            {/* &nbsp; from album
            &nbsp; */}
            {/* <b>{props.songs[props.nextSongIndex].album}</b> */}
          </p>
        </div>
      </p>
      <div className="music-player">
        <audio
          src={props.songs[props.currentSongIndex].src}
          ref={audioElement}
        ></audio>
        <PlayerDetails song={props.songs[props.currentSongIndex]} />

        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
          ShuffleSongs={ShuffleSongs}  //i wanna randomize songs, then set song to currSongIndex to 0
        />

        <div class="player__footer">
          <ul class="list list--footer">
            <li>
              <a href="#" class="list__link">
                <i class="fa fa-heart-o"></i>
              </a>
            </li>
            {showAddSong? (
            <AddSong 
            onUpload={onUpload}
            songData={songData}
            setSongData={setSongData}
            mp3Data={mp3Data}
            setMp3Data={setMp3Data} //prob shouldn't be class skip-btn, this addsong 
            />) : (
              <button className="skip-btn" onClick={() => setShowAddSong(true)}> 
              <FontAwesomeIcon icon={faCoffee} /> 
              </button>
            )}
            <li>
              <a href="#" class="list_link">
               {/*  <button className="shuffle-btn" onClick={() => ShuffleSongs(true)}>
                <FontAwesomeIcon icon={faRandom} /> 
                </button> */}
              </a>

            </li>

            <li>
              <a href="#" class="list__link">
                <i class="fa fa-undo"></i>
              </a>
            </li>

            <li>
              <a href="#" class="list__link">
                <i class="fa fa-ellipsis-h"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* <h4>Lofi Music Player React </h4> */}
      </div>
    </>
  );
}
export default Player;
