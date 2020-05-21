import React, { useState, useEffect, useRef} from 'react';
import styles from './style.module.scss'

const Editor  = (props) =>{
    let headerArea = useRef(null);
    let [headerText, setHeaderText] = useState("");
    let [bodyText, setBodyText] = useState("");

    useEffect(()=>{
        if(headerText === "hi") {
            alert("Hello");
            headerArea && (()=>{headerArea.current.className = styles.alert})();
        }
    },[headerText]);

    useEffect(()=>{
    const timer = setTimeout(()=>{
        setHeaderText("Введите текст")
    }, 3000);
    return ()=>{
        clearTimeout(timer);
    }
    },[]);


  return <div className={styles.wrapper}>
        <main>
            <textarea className={styles.textarea}
                      onChange={(event)=>{setHeaderText(event.currentTarget.value)}}
                      defaultValue={headerText}
                      ref = {headerArea}
            />
            <textarea className={styles.textarea} rows={15}
                      onChange={(event)=>{setBodyText(event.currentTarget.value)}}/>
            <div style = {{display: 'flex', justifyContent: 'space-around'}}>
                <button>Cancel</button>
                <button>Ok</button>
            </div>
        </main>
    </div>

};

export default Editor;
