import logo from './logo.svg';
import styles from './home.module.css';
import Walkppl from './walkppl'
import Header from './header'
import Clickplaylist  from './clickPlaylist';
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
          handleClose={togglePlaylist}
        />}
      </main>

      <footer className={styles.footer}>
        <Walkppl 
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={users}
        />
      </footer>
    </div>
  );
}

export default App;
