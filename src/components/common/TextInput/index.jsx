import React, {Component} from "react";
import styles from './style.module.scss';


export default class TextInput extends Component{

    render() {
        return (
            <input
                type = {'text'}
                className={styles.wrapper}
                placeholder={'Email'}
                onChange= {
                    (event) => { this.props.updateAuthDate (event, 'email')}
                }
            />

        )
    }
}