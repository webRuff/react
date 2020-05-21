import React, {Component} from "react";
import styles from './style.module.scss';

export default class BestPosts extends  Component {
    render()
    {
        return (
            <div className={styles.wrapper}>
                <div>{this.props.likesCount}</div>
                <div style={{color: "#fff", margin:10}}>{this.props.header}</div>
            </div>
        )
    }
}