import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

// play, skip buttons as an component in play
function PlayerControls(props) {
  return (
    <div className="music-player--controls">
      <button className="skip-btn" onClick={() => props.SkipSong(false)}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button
        className="play-btn"
        onClick={() => props.setIsPlaying(!props.isPlaying)}
      >
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </button>
      <button className="skip-btn" onClick={() => props.SkipSong()}>
        <FontAwesomeIcon icon={faForward} />
      </button>
      <button className="shuffle-btn" onClick={() => {
        props.ShuffleSongs(true);      
      }}>
        <FontAwesomeIcon icon={faRandom} />
      </button>

    </div>
  );
}

export default PlayerControls;
