import styles from "./home.module.css";
import {AiFillCloseCircle} from "react-icons/ai"
import react, {useState, useRef, useEffect} from "react";
import React from "react";

const Clickplaylist = () => {

        return (
        <div className={styles.grid1}>
            <div className={styles.playlist} >
                <header >PlayList Title <AiFillCloseCircle className={styles.closebutton} /></header>
                    <div className={styles.playlistheader}>
                        <p >Title</p>
                        <p >Album</p>
                        <p >Date Added</p>
                    </div>
                    <hr />
              <div className={styles.playlistsong} >
                <p>song name</p>
                <p>aalbum name</p>
                <p>Date song added</p>
              </div>
              <hr className={styles.line}/>
            </div>
             </div> 
            
        )
    }


export default Clickplaylist