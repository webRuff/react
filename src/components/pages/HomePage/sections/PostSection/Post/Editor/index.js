import React, { useState, useEffect, useRef} from 'react';
import styles from './style.module.scss'

const Editor  = (props) =>{

    let [headerText, setHeaderText] = useState("");
    let [bodyText, setBodyText] = useState("");

    useEffect(()=>{

    },[headerText]);

    useEffect(()=>{
    const timer = setTimeout(()=>{
        setHeaderText("Введите текст")
    }, 3000);
    return ()=>{
        clearTimeout(timer);
    }
    },[]);

    console.log(`header: ${headerText} body: ${bodyText}`);

  return <div className={styles.wrapper}>
        <main>
            <textarea className={styles.header}
                      onChange={(event)=>{setHeaderText(event.currentTarget.value)}}
            defaultValue={headerText}
            />
            <textarea className={styles.body} rows={18}
                      onChange={(event)=>{setBodyText(event.currentTarget.value)}}/>
            <div style = {{display: 'flex', justifyContent: 'space-around'}}>
                <button>Cancel</button>
                <button>Cancel</button>
            </div>
        </main>
    </div>

};

export default Editor;
