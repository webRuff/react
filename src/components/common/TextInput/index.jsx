import React, {Component} from "react";
import styles from './style.module.scss';


export default class TextInput extends Component{

    render() {
        return (
            <input
                type = {'text'}
                className={styles.wrapper}
                placeholder={'Name'}
                onChange= {
                    (event) => { this.props.updateAuthDate (event, 'login')}
                }
            />

        )
    }
}