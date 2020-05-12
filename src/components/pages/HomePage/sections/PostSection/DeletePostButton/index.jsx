import React, {Component} from "react";
import styles from './style.module.scss';

export default class Post extends Component{

    render() {
        return (
            <button className={styles.wrapper} onClick={this.props.deleteLastPost}>Удалить пост</button>
        )
    }
}
