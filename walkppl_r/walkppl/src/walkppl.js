import React, {useState, useRef, useEffect} from "react";
import styles from "./walkppl.module.css";
import {BsArrowLeftShort} from "react-icons/bs"
import {BsArrowRightShort} from "react-icons/bs"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import {MdLoop} from "react-icons/md"
import {MdShuffle} from "react-icons/md"
import {AiFillStepBackward} from "react-icons/ai"
import {AiFillStepForward} from "react-icons/ai"
import coverimage from './album_covers/Paradise_Coldplay.png'

const Walkppl = (props) => {

    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoop, setIsLoop] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [showAddSong, setShowAddSong] = useState(false);
    const [songData , setSongData] = useState({});
    const [mp3Data , setMp3Data] = useState();

    //references
    const WalkPeople = useRef();
    const ProgressBar = useRef();
    const AnimationRef = useRef();
    
    useEffect(() => {
        const seconds = Math.floor(WalkPeople.current.duration);
        setDuration(seconds);
        ProgressBar.current.max = seconds;
    }, [WalkPeople?.current?.loadedmetadata, WalkPeople?.current?.readyState]);

    useEffect(() => {
        if (currentTime == duration) {
            SkipSong();
        }
        console.log(duration);
    })

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlay = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            WalkPeople.current.play();
            AnimationRef.current = requestAnimationFrame(whilePlaying);
        }
        else {
            WalkPeople.current.pause();
            cancelAnimationFrame(AnimationRef.current);
        }
    }

    const toggleLoop = () => {
        setIsLoop(!isLoop);
    }

    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    }

    const whilePlaying = () => {
        ProgressBar.current.value = WalkPeople.current.currentTime;
        changePlayerTime();
        AnimationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        WalkPeople.current.currentTime = ProgressBar.current.value;
        changePlayerTime();
    }

    const changePlayerTime = () => {
        ProgressBar.current.style.setProperty('--seek-before-width', `${ProgressBar.current.value / duration * 100}%`);
        setCurrentTime(ProgressBar.current.value);
    }

    const backTen = () => {
        ProgressBar.current.value = Number(ProgressBar.current.value) - 10;
        changeRange();
    }

    const forwardTen = () => {
        ProgressBar.current.value = Number(ProgressBar.current.value) + 10;
        changeRange();
    }

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
        ProgressBar.current.value = 0;
        changeRange();
      };

    return (
        <div className={styles.Walkppl}>

            <div className={styles.audioPlayer}>
                <audio ref={WalkPeople} src={props.songs[props.currentSongIndex]?.src} preload="metadata"></audio>

                <div className={styles.songData}>
                    <div className={styles.coverArt}><img src={props.songs[props.currentSongIndex]?.img_src} height={80} width={80}/></div>
                    <div className={styles.otherSongDetails}>
                        <div className={styles.songTitle}>{props.songs[props.currentSongIndex]?.title}</div>
                        <div className={styles.artistName}>{props.songs[props.currentSongIndex]?.artist}</div>
                    </div>
                </div>
                
                <div className={styles.controls}>
                    <button className={styles.backward} onClick={backTen}><BsArrowLeftShort /> 10</button>

                    <button onClick={togglePlay} className={styles.playPause}>
                        { isPlaying ? <FaPause /> : <FaPlay className={styles.play}/> }
                    </button>

                    <button className={styles.forward} onClick={forwardTen}>10 <BsArrowRightShort /></button>

                    {/* current time */}
                    <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

                    { /* progress bar */}
                    <div>
                        <input type="range" className={styles.progressBar} defaultValue="0" ref={ProgressBar} onChange={changeRange}/>
                    </div>

                    {/* duration */}
                    <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                </div>
                <button className={styles.stepBack} onClick={() => SkipSong(false)}>
                    <AiFillStepBackward />
                </button>
                <button className={styles.stepFront} onClick={() => SkipSong()}>
                    <AiFillStepForward />
                </button>
                <button onClick={toggleShuffle} className={styles.shuffleButton}>
                    { isShuffle ? <MdShuffle /> : <MdShuffle className={styles.notShuffle}/> }
                </button>
                <button onClick={toggleLoop} className={styles.loopButton}>
                    { isLoop ? <MdLoop /> : <MdLoop className={styles.notLooping}/> }
                </button>
            </div>
        </div>
    )
}

export default Walkppl