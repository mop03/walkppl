import React from "react";
import { useState, useEffect } from "react";
import "./Player.css";
import Player from "./components/Player";
import db from "./firebase"
import firebase from "firebase/compat/app"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
function App() {
  const [users, setUsers] = useState([]);

// list of hard coded songs with attributes
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

  const [songs] = useState([
    {
      title: "Alone and Lonely",
      artist: "prxz",
      album: " Shiloh Dynasty",
      track: "Love Wounds",
      year: "2",
      img_src: "./songs_images/Alone and Lonely_Cover (front)_e.jpg",
      src: "./songs/Alone and Lonely.mp3",
    },
    {
      title: "Baby You're Worth It",
      artist: "Kina",
      album: "Baby You're Worth It",
      track: "1",
      year: "",
      img_src: "./songs_images/Baby You're Worth It_Cover (front)_e.jpg",
      src: "./songs/Baby You're Worth It.mp3",
    },
   ]);
   
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > users.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);
  return (
    <div className="App">
      {/* <div className="weirdShape"></div> */}
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={users}
      />
    </div>
  );
}

export default App;
