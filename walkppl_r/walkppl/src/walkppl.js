import React, {useState, useRef, useEffect} from "react";
import styles from "./walkppl.module.css";
import {BsArrowLeftShort} from "react-icons/bs"
import {BsArrowRightShort} from "react-icons/bs"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import {FaCoffee} from "react-icons/fa"
import {MdLoop} from "react-icons/md"
import {MdShuffle} from "react-icons/md"
import {AiFillStepBackward} from "react-icons/ai"
import {AiFillStepForward} from "react-icons/ai"
import AddSong from "./Add";
import coverimage from './album_covers/Paradise_Coldplay.png'
import { PropTypes } from 'react'

const Walkppl = (props) => {

    //state
    const isPlaying = props.isPlaying1
    const setIsPlaying = () => {props.setIsPlaying1()}
    const duration = props.duration1
    const setDuration = () => {props.setDuration1()}
    const currentTime = props.currentTime1
    const setCurrentTime = () => { props.setCurrentTime1()}
    const isLoop = props.isLoop1
    const setIsLoop = () => {props.setIsLoop1()}
    const showAddSong = props.showAddSong1
    const setShowAddSong = () => {props.setShowAddSong1()}
    const songData = props.songData1
    const setSongData = () => {props.setSongData1()}
    const mp3Data= props.mp3Data1
    const setMp3Data =() => { props.setMp3Data1()}


    //references
    const WalkPeople = props.WalkPeople1;
    const ProgressBar = props.ProgressBar1;
    const AnimationRef = props.AnimationRef1;
    

    // const calculateTime = () => {props.calculateTime1()}
    // const backTen = () => {props.backTen1()}
    // const togglePlay = () => {props.togglePlay1()}
    // const forwardTen = () => {props.forwardTen1()}
    // const changeRange = () => {props.changeRange1()}
    // const onUpload = () => {props.onUpload1()}
    // const SkipSong = () => {props.SkipSong1()}
    // const ShuffleSongs = () => {props.ShuffleSongs1()}
    // const toggleLoop = () => {props.toggleLoop1()}
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }
    useEffect(() => {
        const seconds = Math.floor(WalkPeople.current.duration);
        setDuration(seconds);
        console.log(seconds)
        ProgressBar.current.max = seconds;
    }, [WalkPeople?.current?.loadedmetadata, WalkPeople?.current?.readyState]);

    useEffect(() => {
        if (currentTime == duration) {
            SkipSong();
        }
    })


    const togglePlay = () => {
        const prevValue = isPlaying;
        props.setIsPlaying1(!prevValue);
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
        props.setIsLoop1(!isLoop);
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
        props.setCurrentTime1(ProgressBar.current.value);
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
        if (!isLoop) {
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
        }
        ProgressBar.current.value = 0;
        changeRange();
      };

      const ShuffleSongs = (shuffle = true) => {
        if (shuffle) {
          console.log('shuffle')
          WalkPeople.current.pause();
            props.shuffle(() => {
            let temp1 = props.songs;
            temp1 = temp1.sort(() => Math.random() - 0.5)
              return temp1;
          });
          
           props.setCurrentSongIndex(() => {
            if (props.currentSongIndex == 0) {
              return props.currentSongIndex + 1;
            }
            else {
                return props.currentSongIndex - 1; 
            } 
          });
        }
      };

      const onUpload = ()=>{
        props.setShowAddSong1(false)
      }
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
                        {isPlaying ? <FaPause /> : <FaPlay className={styles.play}/> }
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
                <div>
                {showAddSong? (
                    <AddSong 
                        onUpload={onUpload}
                        songData={songData}
                        setSongData={props.setSongData1()}
                        mp3Data={mp3Data}
                        setMp3Data={props.setMp3Data1()}
                    />) : (
                <button className={styles.playPause} onClick={() => props.setShowAddSong1(true)}>
                    <FaCoffee />
                </button>
            )}
                </div>
                <button className={styles.stepBack} onClick={() => SkipSong(false)}>
                    <AiFillStepBackward />
                </button>
                <button className={styles.stepFront} onClick={() => SkipSong()}>
                    <AiFillStepForward />
                </button>
                <button className={styles.shuffleButton} onClick={() => ShuffleSongs()}>
                    <MdShuffle />
                </button>
                <button onClick={toggleLoop} className={styles.loopButton}>
                    { isLoop ? <MdLoop /> : <MdLoop className={styles.notLooping}/> }
                </button>
            </div>
        </div>
    )
}

export default Walkppl