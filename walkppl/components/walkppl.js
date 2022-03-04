import react, {useState, useRef, useEffect} from "react";
import styles from "../styles/Walkppl.module.css";
import {BsArrowLeftShort} from "react-icons/bs"
import {BsArrowRightShort} from "react-icons/bs"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
import soundfile from '../audio_samples/Paradise_Coldplay.mp3'
import coverimage from '../album_covers/Paradise_Coldplay.jpeg'

const Walkppl = () => {

    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    //references
    const WalkPeople = useRef();
    const ProgressBar = useRef();
    const AnimationRef = useRef();

    useEffect(() => {
        const seconds = Math.floor(WalkPeople.current.duration);
        setDuration(seconds);
        ProgressBar.current.max = seconds;
    }, [WalkPeople?.current?.loadedmetadata, WalkPeople?.current?.readyState]);

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

    const albumArt = () => {
        return <img src={coverimage} alt='album'/>
    }

    return (
        <div className={styles.Walkppl}>

            <div className={styles.audioPlayer}>
                <audio ref={WalkPeople} src={soundfile} preload="metadata"></audio>

                <div className={styles.songData}>
                    <div className={styles.coverArt}><img src={albumArt} height={80} width={80}/></div>
                    <div className={styles.otherSongDetails}>
                        <div className={styles.songTitle}>Paradise</div>
                        <div className={styles.artistName}>Coldplay</div>
                    </div>
                </div>
                
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
        </div>
    )
}

export {Walkppl}