import React from "react";
import styles from './style.module.scss';

const RoundButton = (props) => <img src = {require("../../../assets/img/icons/addPost.png")}
                                    alt = "deleteButton" className={styles.wrapper}
                                    onClick={props.func}/>;
export default RoundButton;
