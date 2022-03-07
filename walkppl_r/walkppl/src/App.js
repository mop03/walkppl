import logo from './logo.svg';
import styles from './home.module.css';
import Walkppl from './walkppl'
import Header from './header'
import coverimage from './album_covers/Paradise_Coldplay.png'
import playlistimage1 from './album_covers/cries_happy_tears.png'
import playlistimage2 from './album_covers/drowning.png'
import playlistimage3 from './album_covers/sleepy_time.png'
import playlistimage4 from './album_covers/road_trip.png'


function App() {
  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <Header />
      </header>

      <main className={styles.main}>
      <div className={styles.grid}>
          <div className={styles.card}>
            <img src={playlistimage1} width='100%'/>
            <h2>Cries Happy Tears</h2>
            <p>Happy music for happy times.</p>
          </div>

          <div className={styles.card}>
            <img src={playlistimage2} width='100%'/>
            <h2>Drowning</h2>
            <p>Sad music for sad times.</p>
          </div>

          <div className={styles.card}>
            <img src={playlistimage3} width='100%'/>
            <h2>Sleepy Time</h2>
            <p>I'm bored bro.</p>
          </div>

          <div className={styles.card}>
            <img src={playlistimage4} width='100%'/>
            <h2>Road Trip</h2>
            <p>Hurtling towards doom at 90mph.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Walkppl />
      </footer>
    </div>
  );
}

export default App;
