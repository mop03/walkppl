import React from "react";
import { useState, useEffect } from "react";
import "./Player.css";
import Player from "./components/Player";
import firebase from './firebase'
function App() {
  
// list of hard coded songs with attributes
  const [songs] = useState([
    {
      title: "$orries",
      artist: "Peachy!",
      album: " Shiloh",
      track: "$orries",
      year: "1",
      img_src: "./songs_images/$orries_Cover (front)_e.jpg",
      src: "./songs/$orries.mp3",
    },
    {
      title: "[oops]",
      artist: "potsu",
      album: "[oops]",
      track: "1",
      year: "",
      img_src: "./songs_images/[oops]_Cover (front)_e.jpg",
      src: "./songs/[oops].mp3",
    },
    {
      title: "5:32pm",
      artist: "The Deli",
      album: "Vibes 2",
      track: "12",
      year: "",
      img_src: "./songs_images/5 32pm_Cover (front)_e.jpg",
      src: "./songs/5 32pm.mp3",
    },
    {
      title: "88 Keys",
      artist: "Oatmello",
      album: "Snapshots",
      track: "3",
      year: "",
      img_src: "./songs_images/88 Keys_Cover (front)_e.jpg",
      src: "./songs/88 Keys.mp3",
    },
    {
      title: "Affection",
      artist: "Jinsang",
      album: "Life",
      track: "15",
      year: "",
      img_src: "./songs_images/Affection_Cover (front)_e.jpg ",
      src: "./songs/Affection.mp3",
    },
    {
      title: "Again",
      artist: "Wun Two",
      album: "Penthouse",
      track: "4",
      year: "",
      img_src: "./songs_images/Again_Cover (front)_e.jpg",
      src: "./songs/Again.mp3",
    },
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
      if (currentSongIndex + 1 > songs.length - 1) {
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
        songs={songs}
      />
    </div>
  );
}

export default App;
