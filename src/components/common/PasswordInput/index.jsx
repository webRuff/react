import React, {Component} from "react";
import styles from './style.module.scss';

export default class PasswordInput extends Component{

    render() {
        return (
            <input
                type = {'password'}
                className={styles.wrapper}
                placeholder={'Password'}
                onChange= {
                    (event) => { this.props.updateAuthDate (event, 'password')}
                }
            />
        )
    }
}