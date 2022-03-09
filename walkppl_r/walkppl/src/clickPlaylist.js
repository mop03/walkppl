import styles from "./home.module.css";
import {AiFillCloseCircle} from "react-icons/ai"
import react, {useState, useRef, useEffect} from "react";
import React from "react";
import Walkppl from './walkppl'

const Clickplaylist = props => {

        return (
        <div className={styles.grid1}>
            <div className={styles.playlist} >
                <header >PlayList Title <AiFillCloseCircle className={styles.closebutton} onClick={props.handleClose}/></header>
                    <div className={styles.playlistheader}>
                        <p >Title</p>
                        <p >Album</p>
                        <p >Date Added</p>
                    </div>
                    <hr />
              <div className={styles.playlistsong} >
                <p>Song name</p>
                <p>Album name</p>
                <p>Date added</p>
              </div>
              <hr className={styles.line}/>
            </div>
             </div>   
        )
    }

export default Clickplaylist