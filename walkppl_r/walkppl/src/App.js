import logo from './logo.svg';
import styles from './home.module.css';
import Walkppl from './walkppl'
import Header from './header'
import Clickplaylist  from './clickPlaylist';
import AppSearch from './app_search'
import react, {useState, useRef, useEffect} from "react";
import coverimage from './album_covers/Paradise_Coldplay.png'
import db from './firebase'
import playlistimage1 from './album_covers/cries_happy_tears.png'
import playlistimage2 from './album_covers/drowning.png'
import playlistimage3 from './album_covers/sleepy_time.png'
import playlistimage4 from './album_covers/road_trip.png'


function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
    const WalkPeople1 = useRef()
<<<<<<< Updated upstream
    
    // new

=======
>>>>>>> Stashed changes
    const [isPlaying1, setIsPlaying1] = useState(false);
    const [duration1, setDuration1] = useState(0);
    const [currentTime1, setCurrentTime1] = useState(0);
    const [isLoop1, setIsLoop1] = useState(false);
    const [showAddSong1, setShowAddSong1] = useState(false);
    const [songData1 , setSongData1] = useState({});
    const [mp3Data1 , setMp3Data1] = useState();
    const ProgressBar1 = useRef();
    const AnimationRef1 = useRef();

    const setSong = (title) => {
<<<<<<< Updated upstream
      let temp1 = users;
      let temp2 = currentSongIndex 
      console.log(users[users.length-1])
      for(var i =0; i <= users.length; i++){
        if(users[i]?.title == title){

          setCurrentSongIndex(() => {
            
=======
      console.log(';success')
      let temp1 = users;
      let temp2 = currentSongIndex 
      for(var i =0; i <= users.length; i++){
        if(users[i]?.title == title){
          console.log('hi')
          setCurrentSongIndex(() => {
            console.log(i)
>>>>>>> Stashed changes
            return i
          })
          break
        }
      }
      ProgressBar1.current.value = 0;
      changeRange();
      
    }

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlay = () => {
        const prevValue = isPlaying1;
        setIsPlaying1(!prevValue);
        if (!prevValue) {
            WalkPeople1.current.play();
            AnimationRef1.current = requestAnimationFrame(whilePlaying);
        }
        else {
            WalkPeople1.current.pause();
            cancelAnimationFrame(AnimationRef1.current);
        }
    }

    const toggleLoop = () => {
        setIsLoop1(!isLoop1);
    }

    const whilePlaying = () => {
        ProgressBar1.current.value = WalkPeople1.current.currentTime;
        changePlayerTime();
        AnimationRef1.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        WalkPeople1.current.currentTime1 = ProgressBar1.current.value;
        changePlayerTime();
    }

    const changePlayerTime = () => {
        ProgressBar1.current.style.setProperty('--seek-before-width', `${ProgressBar1.current.value / duration1 * 100}%`);
        setCurrentTime1(ProgressBar1.current.value);
    }

    const backTen = () => {
        ProgressBar1.current.value = Number(ProgressBar1.current.value) - 10;
        changeRange();
    }

    const forwardTen = () => {
        ProgressBar1.current.value = Number(ProgressBar1.current.value) + 10;
        changeRange();
    }

    const SkipSong = (forwards = true) => {
        if (!isLoop1) {
            if (forwards) {
                setCurrentSongIndex(() => {
                  let temp = currentSongIndex;
                  temp++;
          
                  if (temp > users.length - 1) {
                    temp = 0;
                  }
          
                  return temp;
                });
            } else {
                setCurrentSongIndex(() => {
                  let temp = currentSongIndex;
                  temp--;
          
                  if (temp < 0) {
                    temp = users.length - 1;
                  }
          
                  return temp;
                });
            }
        }
        ProgressBar1.current.value = 0;
        changeRange();
      };

      const ShuffleSongs = (shuffle = true) => {
        if (shuffle) {
          console.log('shuffle')
          WalkPeople1.current.pause();
            shuffle(() => {
            let temp1 = users;
            temp1 = temp1.sort(() => Math.random() - 0.5)
              return temp1;
          });
          
           setCurrentSongIndex(() => {
            if (currentSongIndex == 0) {
              return currentSongIndex + 1;
            }
            else {
                return currentSongIndex - 1; 
            } 
          });
        }
      };

      const onUpload = ()=>{
        setShowAddSong1(false)
      }

    //new 
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    const togglePlaylist = () => {
        setIsOpen(!isOpen);
    }

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
  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <Header />
        <AppSearch 
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={users}
          shuffle={setUsers}
        />
      </header>

      <main className={styles.main}>
      <div className={styles.grid}>
          <div className={styles.card} onClick={togglePlaylist}>
            <img src={playlistimage1} width='100%'/>
            <h2>Cries Happy Tears</h2>
            <p>Happy music for happy times.</p>
          </div>

          <div className={styles.card} onClick={togglePlaylist}>
            <img src={playlistimage2} width='100%'/>
            <h2>Drowning</h2>
            <p>Sad music for sad times.</p>
          </div>

          <div className={styles.card} onClick={togglePlaylist}>
            <img src={playlistimage3} width='100%'/>
            <h2>Sleepy Time</h2>
            <p>I'm bored bro.</p>
          </div>

          <div className={styles.card} onClick={togglePlaylist}>
            <img src={playlistimage4} width='100%'/>
            <h2>Road Trip</h2>
            <p>Hurtling towards doom at 90mph.</p>
          </div>
        </div>
      
        {isOpen && <Clickplaylist
          content={<>
          </>}
          WalkPeople1={WalkPeople1}
          handleClose={togglePlaylist}
          setSong={setSong}
        />}
      </main>

      <footer className={styles.footer}>
        <Walkppl 
          WalkPeople1={WalkPeople1}
          ProgressBar1={ProgressBar1}
          AnimationRef1={AnimationRef1}
          currentSongIndex={currentSongIndex}
          ProgressBar1={ProgressBar1}
          AnimationRef1={AnimationRef1}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={users}
          shuffle={setUsers}
          isPlaying1={isPlaying1}
          duration1={duration1}
          currentTime1={currentTime1}
          isLoop1={isLoop1}
          showAddSong1={showAddSong1}
          songData1={songData1}
          mp3Data1={mp3Data1}
          setSongData1={setSongData1}
          setMp3Data1={setMp3Data1}
          setDuration1={setDuration1}
          calculateTime1={calculateTime}
          backTen1={backTen}
          forwardTen1={forwardTen}
          changeRange1={changeRange}
          onUpload1={onUpload}
          SkipSong1={SkipSong}
          ShuffleSongs1={ShuffleSongs}
          toggleLoop1={toggleLoop}
          setShowAddSong1={setShowAddSong1}
          togglePlay={togglePlay}
          setIsPlaying1={setIsPlaying1}
          
          setCurrentTime1={setCurrentTime1}
          setIsLoop1={setIsLoop1}
        />
      </footer>
    </div>
  );
}

export default App;