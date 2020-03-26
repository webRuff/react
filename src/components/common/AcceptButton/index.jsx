import React, {Component} from "react";
import styles from './style.module.scss';

export default class AcceptButton extends Component{


    render() {
        return (
            <button
                className={styles.wrapper}
                style={this.props.background}
                onClick={this.props.submit}
            >
                {this.props.text}
            </button>
        )
    }
}

